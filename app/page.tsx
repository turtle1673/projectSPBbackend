"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import BloodCart from "./components/BloodCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-amber-200 rounded-lg mt-5 w-[80%] max-h-[900px] overflow-y-scroll">
        {/* หัวข้อ */}
        <h1 className="text-3xl font-bold text-amber-600 mt-10">
          รอบรู้เรื่องโรคเบาหวาน
        </h1>
        <div className="text-sm text-amber-600 bg-blue-100 px-4 py-1 rounded-full mt-2">
          1 นาทีในการอ่าน
        </div>

        {/* รูปภาพ */}
        <div
          className="mt-6 w-[700px] h-[400px] relative rounded-lg"
          style={{
            backgroundImage:
              "url('https://static.bangkokhospital.com/uploads/2020/04/IHL-%E0%B8%A3%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87-%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B9%80%E0%B8%9A%E0%B8%B2%E0%B8%AB%E0%B8%A7%E0%B8%B2%E0%B8%99-Diabetes.jpg')",
            backgroundSize: "contain", // Ensures the image fits without distortion
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="p-5 ml-10">
          <h1 className="text-amber-500 font-bold text-2xl">รู้จักโรคเบาหวาน</h1>
          <p className="font-bold">
            โรคเบาหวานเป็นโรคซึ่งมีระดับน้ำตาลในเลือดสูง
            โดยเกิดจากความผิดปกติของร่างกายที่ผลิตฮอร์โมนอินซูลินได้ไม่เพียงพอ
            ทำให้ไม่สามารถนำอินซูลินไปใช้ได้อย่างมีประสิทธิภาพ
            ส่งผลให้ระดับน้ำตาลในเลือดสูงผิดปกติ
            หากมีน้ำตาลในเลือดสูงเป็นเวลานานจะทำให้หลอดเลือดแข็งและมีการทำลายไต
            สมอง หัวใจร้ายแรงถึงขั้นเสียชีวิตได้
          </p>
        </div>
        <div className="p-5 ml-10">
          <h1 className="text-amber-500 font-bold text-2xl">ชนิดของเบาหวาน</h1>
          <p className="font-bold">
            โรคเบาหวานโดยหลัก ๆ แบ่งเป็น 2 ชนิด เบาหวานชนิดที่ 1 (Type 1)
            โรคเบาหวานที่เกิดจากตับอ่อนไม่สามารถสร้างอินซูลินได้
            พบบ่อยในเด็กหรือวัยรุ่น
            ซึ่งเกี่ยวข้องกับความผิดปกติในระบบภูมิคุ้มกันในร่างกาย
            การรักษาต้องฉีดอินซูลินตลอดชีวิต เบาหวานชนิดที่ 2 (Type 2)
            โรคเบาหวานที่เกิดจากภาวะดื้อต่ออินซูลินและตับอ่อนสร้างอินซูลินได้ไม่เพียงพอ
            พบบ่อยในผู้ใหญ่อายุ 40 ขึ้นไป บางครั้งไม่แสดงอาการใด ๆ
            ซึ่งในประเทศไทยพบมากกว่า 90%
          </p>
        </div>
        <div className="p-5 ml-10">
          <h1 className="text-amber-500 font-bold text-2xl">รักษาเบาหวาน</h1>
          <p className="font-bold">
            เนื่องจากการรักษาโรคเบาหวานให้ได้ผลดีที่สุดต้องมีการร่วมมือของบุคลากรทางการแพทย์หลายสาขาวิชา
            อาทิเช่น แพทย์ผู้ชำนาญการด้านโรคเบาหวาน นักโภชนาการ นักกิจกรรม
            ที่พรั่งพร้อมด้วยเครื่องมือการตรวจวิเคราะห์ที่ทันสมัย
            รวมทั้งการส่งเสริมให้ผู้ป่วยได้รับความรู้ ความเข้าใจในโรคเบาหวาน
            และสามารถนำไปใช้ในการดูแลตนเองได้
          </p>
          <p className="font-bold mb-2">
           
          </p>
          <p className="font-bold">
            นอกจากนี้ยังมีการบำบัดรักษาโรคเบาหวานด้วยการใช้อินซูลินปั๊ม
            ซึ่งเป็นเครื่องมือที่บรรจุอินซูลิน มีขนาดเล็กพกพาได้สะดวก
            ประกอบด้วยที่บรรจุอินซูลิน ซึ่งจะต่อกับท่อพลาสติกเล็ก ๆ และเข็มฉีด
            เพื่อฉีดอินซูลินเข้าสู่ร่างกายตลอด 24 ชั่วโมง
            เครื่องอินซูลินปั๊มจะถูกตั้งโปรแกรมให้ฉีดอินซูลินขนาดต่ำ ๆ
            เข้าสู่ร่างกายอย่างต่อเนื่องตลอดเวลา
            เพื่อควบคุมระดับน้ำตาลพื้นฐานของผู้ป่วย
            และผู้ป่วยจะเป็นผู้กดให้อินซูลินจากเครื่องเมื่อรับประทานอาหารเพื่อควบคุมระดับน้ำตาลในเลือดที่จะเพิ่มขึ้นหลังรับประทานอาหารเข้าไป
          </p>
        </div>
      </div>
    </div>
  );
}
