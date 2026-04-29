#!/bin/bash
# Push to GitHub script
set -e

echo "=== Staging all files ==="
git add .

echo "=== Committing ==="
git commit -m "feat: complete persona-based AI chatbot with three Scaler personas"

echo "=== Setting remote ==="
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Kirann1973/Persona-Based-AI-Chatbott.git

echo "=== Pushing to main ==="
git branch -M main
git push -u origin main

echo "=== Done! ==="
echo "Visit: https://github.com/Kirann1973/Persona-Based-AI-Chatbott"
