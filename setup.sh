#!/usr/bin/env bash
set -e

echo "→ Bağımlılıklar kuruluyor..."
npm install

echo "→ Claude config oluşturuluyor..."
# Not: composer henüz nextjs-16 desteklemiyor; nextjs-15 config'i Next 16 için de uyumlu çalışıyor.
npx claude-config-composer nextjs-15 shadcn tailwindcss

if [ -f ".env.local.example" ] && [ ! -f ".env.local" ]; then
  echo "→ .env.local oluşturuluyor..."
  cp .env.local.example .env.local
fi

echo ""
echo "✓ Kurulum tamam, npm run dev ile başlayabilirsin"
