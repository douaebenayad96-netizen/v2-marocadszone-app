// src/components/FirebaseTest.tsx
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";

const FirebaseTest: React.FC = () => {
  const [status, setStatus] = useState("Loading...");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simple test to check if Firebase imports work
    const testFirebase = async () => {
      try {
        // Try to import Firebase modules
        const { auth } = await import("../services/firebase/config");

        if (auth) {
          setStatus("✅ Firebase Connected Successfully!");

          // Listen for auth state changes
          const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
          });

          // Return cleanup function
          return unsubscribe;
        } else {
          setStatus("❌ Firebase not properly initialized");
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(`Firebase Error: ${errorMessage}`);
        setStatus("❌ Firebase Failed to Load");
        console.error("Firebase import error:", err);
      }
    };

    const cleanup = testFirebase();

    // Cleanup auth listener on component unmount
    return () => {
      if (cleanup && typeof cleanup.then === "function") {
        cleanup.then((unsubscribe) => {
          if (unsubscribe && typeof unsubscribe === "function") {
            unsubscribe();
          }
        });
      }
    };
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { signInWithGoogle } = await import(
        "../services/firebase/authService"
      );
      const result = await signInWithGoogle();

      if (result.error) {
        setError(result.error);
        console.error("Sign-in failed:", result.error);
      } else {
        // User state will be updated by onAuthStateChanged listener
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sign in with Google";
      setError(errorMessage);
      console.error("Sign-in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { signOutUser } = await import("../services/firebase/authService");
      await signOutUser();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sign out";
      setError(errorMessage);
      console.error("Sign-out error:", err);
    } finally {
      setLoading(false);
    }
  };

  const testEnvironmentVariables = () => {
    const config = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    return config;
  };

  const envConfig = testEnvironmentVariables();

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🔥 Firebase OAuth Test</h1>

      {/* Status */}
      <div
        style={{
          padding: "10px",
          marginBottom: "20px",
          backgroundColor: error ? "#ffebee" : "#e8f5e8",
          border: "1px solid " + (error ? "#f44336" : "#4caf50"),
          borderRadius: "4px",
        }}
      >
        <strong>Status:</strong> {status}
        {error && (
          <div style={{ color: "#f44336", marginTop: "10px" }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* User Info */}

      {user ? (
        <div
          style={{
            padding: "15px",
            marginBottom: "20px",
            backgroundColor: "#e8f5e8",
            border: "1px solid #4caf50",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ color: "#2e7d32", marginTop: 0 }}>
            🎉 Signed In Successfully!
          </h3>
          <div style={{ fontSize: "14px" }}>
            <div>
              <strong>Name:</strong> {user.displayName || "No name"}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>UID:</strong> {user.uid}
            </div>
            <div>
              <strong>Provider:</strong>{" "}
              {user.providerData[0]?.providerId || "Unknown"}
            </div>
            <div>
              <strong>Email Verified:</strong>{" "}
              {user.emailVerified ? "✅ Yes" : "❌ No"}
            </div>
          </div>
          {user.photoURL && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={user.photoURL}
                alt="Profile"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  border: "2px solid #4caf50",
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <p style={{ margin: 0 }}>Not signed in</p>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ marginBottom: "20px" }}>
        {!user ? (
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "#ccc" : "#4285f4",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {loading ? <>⏳ Signing in...</> : <>🚀 Sign in with Google</>}
          </button>
        ) : (
          <button
            onClick={handleSignOut}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "#ccc" : "#f44336",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing out..." : "🚪 Sign Out"}
          </button>
        )}
      </div>

      {/* Environment Variables Check */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Environment Variables:</h3>
        <div style={{ fontSize: "12px", fontFamily: "monospace" }}>
          <div>API Key: {envConfig.apiKey ? "✅ Set" : "❌ Missing"}</div>
          <div>
            Auth Domain: {envConfig.authDomain ? "✅ Set" : "❌ Missing"}
          </div>
          <div>Project ID: {envConfig.projectId ? "✅ Set" : "❌ Missing"}</div>
          <div>
            Storage Bucket: {envConfig.storageBucket ? "✅ Set" : "❌ Missing"}
          </div>
          <div>
            Messaging Sender ID:{" "}
            {envConfig.messagingSenderId ? "✅ Set" : "❌ Missing"}
          </div>
          <div>App ID: {envConfig.appId ? "✅ Set" : "❌ Missing"}</div>
        </div>
      </div>

      {/* Project Info */}
      {envConfig.projectId && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Project Info:</h3>
          <div>
            Project ID: <code>{envConfig.projectId}</code>
          </div>
          <div>
            Auth Domain: <code>{envConfig.authDomain}</code>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#fff3e0",
          border: "1px solid #ff9800",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0", color: "#e65100" }}>
          📋 Test Instructions:
        </h4>
        <ol style={{ margin: 0, paddingLeft: "20px" }}>
          <li>Click "Sign in with Google" button</li>
          <li>Choose your Google account</li>
          <li>Grant permissions</li>
          <li>You should see your profile info above</li>
          <li>Test "Sign Out" to complete the flow</li>
        </ol>
      </div>

      {/* Debug Info */}
      <details style={{ marginTop: "20px" }}>
        <summary style={{ cursor: "pointer" }}>🔍 Debug Information</summary>
        <pre
          style={{
            fontSize: "11px",
            backgroundColor: "#f5f5f5",
            padding: "10px",
            overflow: "auto",
            marginTop: "10px",
          }}
        >
          {JSON.stringify(
            {
              timestamp: new Date().toISOString(),
              userSignedIn: !!user,
              userId: user?.uid || null,
              userEmail: user?.email || null,
              envVars: Object.keys(envConfig).reduce((acc, key) => {
                acc[key] = envConfig[key as keyof typeof envConfig]
                  ? "SET"
                  : "MISSING";
                return acc;
              }, {} as Record<string, string>),
            },
            null,
            2
          )}
        </pre>
      </details>
    </div>
  );
};

export default FirebaseTest;
