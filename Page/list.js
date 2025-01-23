// ตั้งค่าการเชื่อมต่อกับ Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

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

// ดึงข้อมูลต้นไม้จาก Firestore
const treeList = document.getElementById('tree-list').getElementsByTagName('tbody')[0];

const fetchTreeData = async () => {
    const querySnapshot = await getDocs(collection(db, "TreeDatabase"));
    querySnapshot.forEach((doc) => {
        const treeData = doc.data();
        const treeId = doc.id;

        // สร้างแถวใหม่สำหรับตาราง
        const row = document.createElement('tr');
        row.addEventListener('click', () => {
            window.location.href = `details.html?id=${treeId}`;
        });

        // สร้างเซลล์ในแถว
        row.innerHTML = `
            <td>${treeData.name}</td>
            <td>${treeData.auditor}</td>
            <td>${treeData.auditDate}</td>
            <td>${treeData.carbonAbsorption} กิโลกรัม</td>
            <td>${treeData.description}</td>
            <td>${treeData.height} เมตร</td>
            <td>(${treeData.latitude}, ${treeData.longitude})</td>
            <td>${treeData.imageURL && treeData.imageURL !== '-' ? `<img src="${treeData.imageURL}" alt="${treeData.name}">` : '-'}</td>
        `;

        // เพิ่มแถวในตาราง
        treeList.appendChild(row);
    });
};

// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลเมื่อโหลดหน้า
fetchTreeData();