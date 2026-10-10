#!/usr/bin/env python3
"""
Hero Video & Asset Pipeline for Aadhish Dhamnikar Portfolio.
Crops video tightly around person, whitens background, creates a seamless 10s loop with numpy audio crossfade,
and exports hero.mp4, hero.webm, portrait-bust.webp, and og.jpg.
"""

import os
import sys
import shutil
import subprocess
import wave
import numpy as np
from PIL import Image

def get_ffmpeg():
    paths = [
        shutil.which('ffmpeg'),
        '/opt/homebrew/bin/ffmpeg',
        '/usr/local/bin/ffmpeg',
        os.path.join(os.getcwd(), 'node_modules/.bin/ffmpeg'),
        os.path.join(os.getcwd(), 'node_modules/ffmpeg-static/ffmpeg'),
    ]
    for p in paths:
        if p and os.path.isfile(p) and os.access(p, os.X_OK):
            return p
    return 'ffmpeg'

def main():
    ffmpeg = get_ffmpeg()
    print(f"Using ffmpeg at: {ffmpeg}")

    # Locate input video
    input_video = None
    for candidate in ['Intro video1.mp4', 'intro.mp4', 'intro.mov', 'public/hero/intro.mp4']:
        if os.path.exists(candidate):
            input_video = candidate
            break

    if not input_video:
        print("Error: Input video not found (looked for 'Intro video1.mp4', 'intro.mp4')")
        sys.exit(1)

    print(f"Processing input video: {input_video}")
    os.makedirs('public/hero', exist_ok=True)

    # 1. Audio Processing with NumPy: Sample-accurate seamless loop
    temp_wav_in = 'public/hero/temp_in.wav'
    temp_wav_loop = 'public/hero/temp_loop.wav'
    temp_video_loop = 'public/hero/temp_video.mp4'

    print("Step 1: Extracting audio to 48kHz WAV...")
    cmd_audio_extract = [
        ffmpeg, '-y', '-i', input_video,
        '-vn', '-t', '10.0', '-ar', '48000', '-ac', '2',
        temp_wav_in
    ]
    subprocess.run(cmd_audio_extract, check=True)

    print("Step 2: Performing sample-accurate audio cross-fade in NumPy...")
    with wave.open(temp_wav_in, 'rb') as wf:
        n_channels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        framerate = wf.getframerate()
        n_frames = wf.getnframes()
        raw_bytes = wf.readframes(n_frames)

    audio_data = np.frombuffer(raw_bytes, dtype=np.int16)
    audio_data = audio_data.reshape(-1, n_channels).astype(np.float32)

    # Crossfade duration: 0.5s = 24000 samples at 48kHz
    fade_len = int(framerate * 0.5)
    total_samples = len(audio_data)

    if total_samples > fade_len * 2:
        # Loop duration: from fade_len (0.5s) to total_samples
        # The last fade_len samples are crossfaded with the first fade_len samples (0.0 to 0.5s)
        main_audio = audio_data[fade_len:].copy()
        head_audio = audio_data[:fade_len].copy()

        # Fade curves (equal-power / linear cross-fade)
        fade_out = np.linspace(1.0, 0.0, fade_len)[:, None]
        fade_in = np.linspace(0.0, 1.0, fade_len)[:, None]

        tail_blended = (main_audio[-fade_len:] * fade_out) + (head_audio * fade_in)
        main_audio[-fade_len:] = tail_blended

        output_audio = np.clip(main_audio, -32768, 32767).astype(np.int16)

        with wave.open(temp_wav_loop, 'wb') as wf:
            wf.setnchannels(n_channels)
            wf.setsampwidth(sampwidth)
            wf.setframerate(framerate)
            wf.writeframes(output_audio.tobytes())
        print("Audio seamless loop complete.")
    else:
        shutil.copy(temp_wav_in, temp_wav_loop)

    # 2. Video Processing with ffmpeg:
    # Crop 1280x720 -> 576:720:352:0 (aspect ratio 768:960 = 0.8), scale to 768x960
    # Preserve the source while trimming and looping; brighten each delivery format below.
    # Video cross-fade: 0.5s xfade at offset 9.0s for total 9.5s duration
    print("Step 3: Processing video with crop, colorlevels, and xfade loop...")
    filter_complex = (
        "[0:v]trim=start=0:end=10,setpts=PTS-STARTPTS,"
        "crop=576:720:352:0,scale=768:960[v];"
        "[v]split[v1][v2];"
        "[v1]trim=start=0.5:end=10,setpts=PTS-STARTPTS[main];"
        "[v2]trim=start=0:end=0.5,setpts=PTS-STARTPTS[head];"
        "[main][head]xfade=transition=fade:duration=0.5:offset=9.0[outv]"
    )

    cmd_video_loop = [
        ffmpeg, '-y', '-i', input_video,
        '-filter_complex', filter_complex,
        '-map', '[outv]', '-an',
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '18',
        temp_video_loop
    ]
    subprocess.run(cmd_video_loop, check=True)

    # 3. Export hero.mp4 and hero.webm
    hero_mp4 = 'public/hero/hero.mp4'
    hero_webm = 'public/hero/hero.webm'

    print("Step 4: Muxing hero.mp4 (H.264 / AAC 96k / +faststart)...")
    cmd_mux_mp4 = [
        ffmpeg, '-y',
        '-i', temp_video_loop,
        '-i', temp_wav_loop,
        '-vf', "colorlevels=rimax=0.85:gimax=0.85:bimax=0.85",
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '24', '-preset', 'slow',
        '-c:a', 'aac', '-b:a', '96k',
        '-movflags', '+faststart',
        hero_mp4
    ]
    subprocess.run(cmd_mux_mp4, check=True)
    print(f"Created {hero_mp4}")

    print("Step 5: Muxing hero.webm with a brightened backdrop (VP9 / Opus 80k)...")
    cmd_mux_webm = [
        ffmpeg, '-y',
        '-i', temp_video_loop,
        '-i', temp_wav_loop,
        '-vf', "colorlevels=rimax=0.85:gimax=0.85:bimax=0.85",
        '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuv420p', '-crf', '32', '-b:v', '0',
        '-c:a', 'libopus', '-b:a', '80k',
        hero_webm
    ]
    subprocess.run(cmd_mux_webm, check=True)
    print(f"Created {hero_webm}")

    # Cleanup temporary files
    for temp_f in [temp_wav_in, temp_wav_loop, temp_video_loop]:
        if os.path.exists(temp_f):
            os.remove(temp_f)

    # 4. Portrait & OG image generation
    print("Step 6: Generating portrait-bust.webp and og.jpg...")
    pic_src = 'Pic.jpg'
    if os.path.exists(pic_src):
        img = Image.open(pic_src)
        w, h = img.size
        target_ratio = 480 / 600
        crop_w = int(h * target_ratio)
        if crop_w > w:
            crop_w = w
            crop_h = int(w / target_ratio)
            left = 0
            top = int((h - crop_h) * 0.2)
            right = w
            bottom = top + crop_h
        else:
            crop_h = h
            left = int((w - crop_w) / 2)
            top = 0
            right = left + crop_w
            bottom = h

        cropped = img.crop((left, top, right, bottom))
        resized = cropped.resize((480, 600), Image.Resampling.LANCZOS)
        resized.save('public/portrait-bust.webp', 'WEBP', quality=92)
        print("Saved public/portrait-bust.webp (480x600)")

        # og.jpg
        og = Image.new('RGB', (1200, 630), color='#f4f2ee')
        bust_thumb = resized.resize((360, 450), Image.Resampling.LANCZOS)
        og.paste(bust_thumb, (760, 90))
        og.save('public/og.jpg', 'JPEG', quality=90)
        print("Saved public/og.jpg (1200x630)")

    print("Hero asset pipeline finished successfully!")

if __name__ == '__main__':
    main()
