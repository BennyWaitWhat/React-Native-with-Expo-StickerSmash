# Getting Started with React Native using Expo

This repository will guide you through setting up a React Native app with Expo, a framework that simplifies the development of Android, iOS, and web applications.

## System Requirements

- **Node.js (LTS):** [Node.js](https://nodejs.org/en/)
- **Operating System:** macOS, Windows (PowerShell and WSL 2), or Linux. This guide uses Windows.

## Setting Up the Project

### Step 1: Create a New Expo Project

I recommend starting with the default project created by `create-expo-app`. This default project includes example code to help you get started.

To create a new project, run the following command:

```
npx create-expo-app@latest
```
### Step 2: Setting Up Your Development Environment

Now that you have a project, it's time to set up your development environment.

#### Install JDK

**Prerequisites**

Use a package manager such as Chocolatey to install the necessary dependencies.

**Install Dependencies**

Install the Java SE Development Kit (JDK):

```
choco install -y microsoft-openjdk17
```
### Step 3: Set Up Android Studio

1. **Download Android Studio:** [Android Studio](https://developer.android.com/studio)

2. **Open Android Studio Setup:**
    - Under "Select components to install," select **Android Studio** and **Android Virtual Device**. Click **Next**.

3. **Install Type:**
    - In the Android Studio Setup Wizard, select **Standard** and click **Next**.

4. **Verify Settings:**
    - The Setup Wizard will ask you to verify settings like the version of Android SDK, platform-tools, etc. Click **Next** after verification.

5. **Accept Licenses:**
    - Accept licenses for all available components.

6. **Configure `ANDROID_HOME` Environment Variable:**
    - Go to **Windows Control Panel > User Accounts > User Accounts (again) > Change my environment variables**.
    - Click **New** to create a new `ANDROID_HOME` user variable. The value of this variable should point to the path of your Android SDK.

7. **Verify Environment Variable:**
    - Open PowerShell and run the following command:

    ```powershell
    Get-ChildItem -Path Env:
    ```
    - Check if `ANDROID_HOME` is listed.

8. **Add `platform-tools` to Path:**
    - Go to **Windows Control Panel > User Accounts > User Accounts (again) > Change my environment variables > Path > Edit > New**.
    - Add the path to the platform-tools to the list.

9. **Verify `adb` Installation:**
    - Run the following command in PowerShell to check if `adb` is installed:

    ```powershell
    adb --version
    ```
### Step 4: Start the Development Server

To start the development server, run the following command:

```bash
npx expo start
```

### Step 5: Open the App on Your Device

After running the command above, you will see a QR code in your terminal. Scan this QR code to open the app on your device.

- **Android Emulator:** Press `a` to open the app.
- **iOS Simulator:** Press `i` to open the app.
- **Your own device:** [Install Expo Go](https://expo.dev/go) on a physical device.

## Conclusion

You are now set up to start developing your React Native app with Expo! Happy coding!

Feel free to open an issue if you encounter any problems or have any questions.
