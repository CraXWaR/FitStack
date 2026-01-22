import {useState} from "react";
import * as React from "react";

import './App.css'

function App() {
    interface RegisterFormData {
        firstName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Сървърна грешка:", errorText);
                alert("Бекендът се срина. Виж конзолата на сървъра!");
                return;
            }

            const data = await response.json();
            alert(`Успех ${data}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

  return (
      <div className="container">
          <h1>FitStack Регистрация</h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
              <input name="firstName" placeholder="Име" onChange={handleChange} />
              <input name="email" type="email" placeholder="Имейл" onChange={handleChange} />
              <input name="password" type="password" placeholder="Парола" onChange={handleChange} />
              <input name="confirmPassword" type="password" placeholder="Повтори парола" onChange={handleChange} />

              <button type="submit">Регистрирай ме</button>
          </form>
      </div>
  )
}

export default App
