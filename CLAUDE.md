@AGENTS.md

# Proje

Next.js 16 starter template. Hızlı proje başlatma için hazırlanmış; Tailwind, shadcn/ui, motion ve gsap önceden kurulu.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** (v4)
- **shadcn/ui** — base component'ler
- **motion** — basit/declarative animasyonlar
- **gsap** — kompleks/timeline tabanlı animasyonlar
- **lucide-react** — icon set

## Klasör Yapısı

```
src/
├── app/                  # Next.js App Router (page, layout, route handler)
├── components/
│   ├── ui/               # shadcn primitive'leri (button, card, dialog, ...)
│   ├── layout/           # Navbar, Footer gibi global layout parçaları
│   └── sections/         # Sayfa içi büyük bölümler (Hero, Features, CTA, ...)
├── hooks/                # Custom React hook'ları (useMediaQuery, ...)
├── lib/                  # Yardımcı fonksiyonlar, util, sdk client'ları (firebase.ts, supabase/, ...)
├── types/                # Proje genelindeki paylaşılan TypeScript type'ları
└── extras/               # Setup rehberleri (firebase-setup.md, supabase-setup.md, resources.md)
```

## Kurallar

### Bileşen ekleme

1. Önce **shadcn**'de var mı bak: `npx shadcn@latest add <component>`
2. shadcn'de yoksa:
   - Tekrar kullanılan UI parçası → `src/components/ui/`
   - Sayfa bölümü (hero, feature grid vb.) → `src/components/sections/`
   - Global layout (nav, footer, sidebar) → `src/components/layout/`

### Animasyon

- **Basit hover, fade, slide, layout animasyonları → `motion`**
- **Kompleks timeline, scroll-trigger, sıralı sahne → `gsap`**
- İkisini aynı element üstünde karıştırma.

### Veritabanı / Backend

Firebase veya Supabase entegrasyonu gerekirse:

- `src/extras/firebase-setup.md`
- `src/extras/supabase-setup.md`

Adım adım kurulum komutları ve config dosyası örnekleri burada. Env değişkenleri `.env.local.example`'da placeholder olarak duruyor.

### Ek kaynaklar

İlham, ekstra UI kütüphaneleri, animasyon araçları için: `src/extras/resources.md`

## Kurulum

Template'ten yeni proje oluşturduktan sonra:

```bash
./setup.sh
```

Bu script `npm install`, `claude-config-composer` ve `.env.local` kopyalama işlemlerini yapar.
