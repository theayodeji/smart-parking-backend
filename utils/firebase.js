import admin from 'firebase-admin';

const serviceAccount = {
  type: "service_account",
  project_id: "test-parking-database",
  private_key_id: "2cbcda1fe77e5677cfe64e1297cd47908fffe06a",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDe7nA0lwWHVh5y\ntlx+IX6X2fvBrNRkEK0gI7+5plfInaIAMb57FzqItLfCPcneBcoDSjT4mvxd5fTd\n4N9kNdzzD2phQXmbh7Dlp3QaZLW8/97oUP9HBBzy9TpYP/XbLynjuPr4D5vWLhp9\nVNmfa4v5mqhMoDrBGzpa5kSs4JPr048ajgJ9c3QFQpxYQZXejFmXiIlngQLgjL2d\nxPm1rVUElvaOD2tQcE5nycI6tjKShKJ1y6OODGKIPt5iAVF9KO016Ws/M2oePw6I\nybkabEZg4VlIRd71lus7CbsuKotFx2hg2y5rSPYpkXS+kZfKp9VmEWqF9LjFNKFY\nK94zz25HAgMBAAECggEAQxDwaKHWY/SgjFoYUUm6T+ygNI/OBZyOuNCIaU2FszDY\n/733VAiU73OOpLz58fVD5OF6NiBKM+VuWSHBkuAxbF4C3udXslaL/Ur3Psl1czp2\n0OUtJywxmVX1C3+SczIpI/0OY3ouo6yTA4l3PuKX5auFXigGBPowABCuMGQPnC4l\nbeYeSz38ASQAT5vVRVvSfICydJ/JMs5j+nZno4OLHXQWHnbf9nhO99vmafJKKWvt\nkqR70lOt0CldZ4h4xxeCciVf/vyqETnLkY2VWq92ljhW8ttBjF4fHRQMOuDhfS4E\nEGJuHi2BpgaE3Q3Hu4mjnY6Wqy1GKxD9X6+rzVUpIQKBgQDvB8AGBSA7cl4c9NJb\nANaddN9YmzpskaHmukKq4teSWy2ze2vtrQnkoSK4x0ohvgA4FAsL1EkpxL8qeDyE\nJJ3IgVr2VwL4ILvG0oGtPx4g/bh2u7L+SrBp9N9nLN4P2HYZP+IU+pOz8lNUeQjl\nBRQkAdg6KY3igcNEZ6RIh7f+6wKBgQDuwhmAN8NdJi/xp/At6wssk22HJyMkYCp6\niGEySPOXIAv830Jwou3Y+Na87EWG1f8NlovKy7AAxu/4qrE3uDVtMEYhwBW8VxtX\nxOmwpqFID0togaNjc3zEVfcZzAxi8Az+wBPDRJ4zXiRGjhu5JJrRwk44fgGKlgjO\nnzvdzOdPFQKBgQDpVGFn/vz1yrCAB6SH3Qui7IFRV0Xy0T5/ofaOJZ1VatfzylkS\ny8VKftkMEs4UngpMs5QM2g8JTNtnM7OvMqcrIMqQiWOGnz1t2fNoEKLyhXnZvWP+\nwx3ucHDboHqscRrnjuq8m9Yu5C/f176NASYl9/8A16t/Hjhkv98oRgOgPQKBgQC9\nxPTz3l6fmQyebLcQKDO3eG6j782UygK5ZdCrYSSLx+L/WIy8biPSQuabPsh8RXb1\n2+S8iW0ZEQYHhdRZz0ZXxPjZNo2QJ0QKXO7Jg4fJeK6dH/03vME8ZH+Et5RYxyft\nC8opeE6t0XPPyH/shlWvx1rYt/6NonbZk+LHhmeLiQKBgQCvmbObZKsAJk2votRc\n2kBaT4j2bm5GKNM92u7YZWMo24nYR1uqqO2hW6rOlPXer5fd2VIWCMoDOpd6pboC\npWnFlaMk7QDe8Wemi8Lx8LJRmmRl9JJWhx+rE4Bu9YDGQE+O57EAb7P6T1EGz0CA\n7QNwOiiCbyIDnBU02Wca/vXpow==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-fbsvc@test-parking-database.iam.gserviceaccount.com",
  client_id: "112582671733559682940",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40test-parking-database.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-parking-database-default-rtdb.europe-west1.firebasedatabase.app" // Replace with your Firebase database URL
});

export default admin;
