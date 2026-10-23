# Manutenção Industrial 🏭

Aplicativo para registro e acompanhamento de falhas em motores trifásicos na manutenção industrial, desenvolvido com **React**, **Vite** e **Capacitor (Android)**.

---

## 🚀 Como gerar o APK via GitHub Actions

Este repositório possui uma pipeline configurada no **GitHub Actions** (`.github/workflows/build-apk.yml`) que compila o aplicativo Android e gera o arquivo `.apk` pronto para instalação.

### Como baixar o APK gerado:
1. Acesse a aba **[Actions](../../actions)** deste repositório no GitHub.
2. Clique no workflow mais recente (ou clique em **Build Android APK** na barra lateral esquerda e selecione a execução).
3. Na seção **Artifacts** (no rodapé da página da execução), clique em **`ManutencaoInd-debug-apk`**.
4. Extraia o arquivo `.zip` baixado para obter o `app-debug.apk` e instale no seu celular Android.

### Como disparar um build manual:
1. Vá na aba **Actions**.
2. Clique no fluxo **Build Android APK**.
3. Clique no botão **Run workflow** e selecione a branch `main`.

---

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Vite**
- **Capacitor 8** (`@capacitor/android`, `@capacitor/camera`, `@capacitor/core`)
- **Android SDK** (Gradle 8.14, Java 21)

---

## 💻 Desenvolvimento Local

### Pré-requisitos
- Node.js (versão 20 ou superior)
- Android Studio ou Android SDK com JDK 21

### Instalação e execução web
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build web de produção
npm run build
```

### Sincronizar e abrir no Android Studio
```bash
# Sincronizar assets e plugins com o projeto Android
npx cap sync android

# Abrir no Android Studio
npx cap open android
```
