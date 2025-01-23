// ตั้งค่าการเชื่อมต่อกับ Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

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

// ฟังก์ชันเพื่อหาชื่อเอกสารถัดไป (Tree1, Tree2, Tree3)
const getNextTreeName = async () => {
    const querySnapshot = await getDocs(collection(db, "TreeDatabase"));
    let maxTreeNumber = 0;
    querySnapshot.forEach((doc) => {
        const treeName = doc.id;
        const treeNumber = parseInt(treeName.replace('Tree', ''));
        if (treeNumber > maxTreeNumber) {
            maxTreeNumber = treeNumber;
        }
    });

    return `Tree${maxTreeNumber + 1}`;
};

// ฟังก์ชันแปลงไฟล์เป็น Base64
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

// ฟังก์ชันที่บันทึกข้อมูลลง Firestore
document.getElementById('tree-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // ดึงค่าจากฟอร์ม
    const treeName = await getNextTreeName();
    const name = document.getElementById('name').value.trim();
    const auditDate = document.getElementById('auditDate').value.trim();
    const auditor = document.getElementById('auditor').value.trim();
    const carbonAbsorption = parseInt(document.getElementById('carbonAbsorption').value.trim());
    const description = document.getElementById('description').value.trim();
    const height = parseInt(document.getElementById('height').value.trim());
    const latitude = document.getElementById('latitude').value.trim();
    const longitude = document.getElementById('longitude').value.trim();
    const imageFile = document.getElementById('imageUpload').files[0]; // รูปภาพจากฟอร์ม

    let imageBase64 = '-'; // ค่าเริ่มต้นสำหรับ Base64
    if (imageFile) {
        try {
            imageBase64 = await convertToBase64(imageFile); // แปลงรูปภาพเป็น Base64
        } catch (error) {
            console.error("Error converting image to Base64:", error);
            alert("เกิดข้อผิดพลาดในการแปลงรูปภาพ โปรดลองใหม่อีกครั้ง!");
            return;
        }
    }

    if (!name) {
        alert("กรุณากรอกชื่อของต้นไม้!");
        return;
    }

    try {
        console.log("กำลังบันทึกข้อมูลลง Firestore...");

        // สร้างเอกสารใหม่ใน Firestore
        const docRef = doc(db, "TreeDatabase", treeName);
        await setDoc(docRef, {
            id: treeName,
            name,
            auditDate,
            auditor,
            carbonAbsorption,
            description,
            height,
            latitude,
            longitude,
            imageURL: imageBase64 // บันทึก Base64 ของรูปภาพ
        });

        console.log(`Document with ID: ${treeName} เขียนสำเร็จ!`);
        alert("บันทึกข้อมูลสำเร็จ!");
        window.location.href = "list.html"; 
    } catch (e) {
        console.error("เกิดข้อผิดพลาดในการเพิ่มเอกสาร: ", e);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล โปรดลองใหม่อีกครั้ง!");
    }
});
