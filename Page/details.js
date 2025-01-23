import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAN7ylafeQPy3zZHY5gbhdFrxInExngdFQ",
    authDomain: "cfme-6ec97.firebaseapp.com",
    databaseURL: "https://cfme-6ec97-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cfme-6ec97",
    storageBucket: "cfme-6ec97.firebasestorage.app",
    messagingSenderId: "570460819056",
    appId: "1:570460819056:web:4305cacf52236fae25aeb5",
    measurementId: "G-E58XZD7JEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ดึง id จาก URL
const urlParams = new URLSearchParams(window.location.search);
const treeId = urlParams.get('id');

const fetchTreeDetail = async () => {
    const treeDetail = document.getElementById('tree-detail');

    if (!treeId) {
        treeDetail.innerHTML = '<p>ไม่พบ ID ของต้นไม้ใน URL</p>';
        return;
    }

    try {
        const docRef = doc(db, "TreeDatabase", treeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const treeData = docSnap.data();

            treeDetail.innerHTML = `
                <h2>${treeData.name}</h2>
                <div>
                    <p><strong>ผู้ตรวจสอบ:</strong> ${treeData.auditor}</p>
                    <p><strong>วันที่ตรวจสอบ:</strong> ${treeData.auditDate}</p>
                    <p><strong>การดูดซับคาร์บอน:</strong> ${treeData.carbonAbsorption} กิโลกรัม</p>
                    <p><strong>คำอธิบาย:</strong> ${treeData.description}</p>
                    <p><strong>ความสูง:</strong> ${treeData.height} เมตร</p>
                    <p><strong>พิกัด:</strong> (${treeData.latitude}, ${treeData.longitude})</p>
                </div>
                ${treeData.imageURL && treeData.imageURL !== '-' ? `<img src="${treeData.imageURL}" alt="${treeData.name}" style="max-width: 100%; height: auto;">` : '<p>ไม่มีรูปภาพ</p>'}
            `;
        } else {
            treeDetail.innerHTML = '<p>ไม่พบข้อมูลต้นไม้ในฐานข้อมูล</p>';
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        treeDetail.innerHTML = '<p>เกิดข้อผิดพลาดในการดึงข้อมูล</p>';
    }
};

// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลเมื่อโหลดหน้า
fetchTreeDetail();
