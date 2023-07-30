#!/usr/bin/env bash


rm -r web-ext-artifacts
npx web-ext build
mv web-ext-artifacts/wallpaper-abyss_bulk_downloader-1.1.zip web-ext-artifacts/wallpaper-abyss_bulk_downloader-1.1.xpi