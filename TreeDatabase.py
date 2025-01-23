import json

# ข้อมูลต้นไม้
trees = [
    {
        "id": "Tree1",
        "name": "โกงกางใบเล็ก",
        "auditDate": "2024-12-21",
        "auditor": "VK",
        "carbonAbsorption": 228,
        "description": "ต้นโกงกางชนิดหนึ่ง",
        "height": 14,
        "latitude": "6.53609401546418",
        "longitude": "100.071014994755",
        "imageURL": ""
    },
    {
        "id": "Tree2",
        "name": "แสมขาว",
        "auditDate": "2024-12-22",
        "auditor": "Auditor A",
        "carbonAbsorption": 150,
        "description": "ต้นแสมขาวชนิดหนึ่ง",
        "height": 10,
        "latitude": "7.123456",
        "longitude": "100.987654",
        "imageURL": ""
    }
]

# แปลงข้อมูลเป็น JSON
json_data = {tree["id"]: tree for tree in trees}

# บันทึกลงไฟล์
with open("TreedDatabase.json", "w", encoding="utf-8") as f:
    json.dump(json_data, f, ensure_ascii=False, indent=4)

print("ไฟล์ JSON ถูกสร้างแล้ว!")
