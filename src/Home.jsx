import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [nameUz, setNameUz] = useState(localStorage.getItem("nameUz") || "");
  const [nameRu, setNameRu] = useState(localStorage.getItem("nameRu") || "");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("nameUz", nameUz);
    localStorage.setItem("nameRu", nameRu);
  }, [nameUz, nameRu]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setError("Iltimos, rasmni tanlang");
      return;
    }

    try {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append(`images`, image);
      });

      formData.append("name_en", nameUz);
      formData.append("name_ru", nameRu);

      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://autoapi.dezinfeksiyatashkent.uz/api/categories",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Yuklashda xatolik yuz berdi");
      }
      const data = await response.json();
      console.log(data);
      navigate("/success"); // Muvaffaqiyat sahifasiga yo'naltirish, agar muvaffaqiyatlik bo'lsa
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Bosh sahifa</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="uzbekcha raqam"
          value={nameUz}
          onChange={(e) => setNameUz(e.target.value)}
        />
        <input
          type="text"
          placeholder="ruscha raqam"
          value={nameRu}
          onChange={(e) => setNameRu(e.target.value)}
        />
        <input
          type="file"
          placeholder="rasm"
          onChange={(e) => setImages(Array.from(e.target.files))}
          multiple
        />
        <button type="submit">Kirish</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
