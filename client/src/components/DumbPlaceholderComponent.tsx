import React, {useState} from "react";

const DumbPlaceholderComponent: React.FC = () => {
    const [isRegister, setIsRegister] = useState({})

    interface RegisterFormData {
        firstName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }
    interface LoginFormData {
        email: string;
        password: string;
    }

    const [registerData, setRegisterData] = useState<RegisterFormData>({
        firstName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loginData, setLoginData] = useState<LoginFormData>({email: "", password: ""});

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value
    });
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => setLoginData({
        ...loginData,
        [e.target.name]: e.target.value
    });

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(registerData)
            });
            if (!response.ok) {
                const errorData = await response.json();

                errorData.errors.forEach((err: {
                    field: string;
                    message: string
                }) => console.error(`${err.field}: ${err.message}`));
                alert("Регистрацията се провали. Виж конзолата!");
                return;
            }
            const data = await response.json();

            alert(`Успех! регистарция ${data.message}`);
        } catch (error: any) {
            alert(error.message);
        }
    };
    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(loginData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors) errorData.errors.forEach((err: {
                    field: string;
                    message: string
                }) => console.error(`${err.field}: ${err.message}`));
                alert("Входът се провали. Виж конзолата!");
                return;
            }
            const data = await response.json();
            localStorage.setItem("token", data.token);
            alert(`Успех! Добре дошъл, ${data.firstName}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <button
                onClick={() => setIsRegister(!isRegister)}
                style={{ marginBottom: "20px" }}
            >
                {isRegister ? "Вече имате акаунт? Влез" : "Нямате акаунт? Регистрирай се"}
            </button>

            {!isRegister ? (
                <>
                    <h1>FitStack Регистрация</h1>
                    <form
                        onSubmit={handleRegisterSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            maxWidth: "300px",
                            margin: "0 auto"
                        }}
                    >
                        <input
                            name="firstName"
                            placeholder="Име"
                            value={registerData.firstName}
                            onChange={handleRegisterChange}
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Имейл"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Парола"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                        />
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Повтори парола"
                            value={registerData.confirmPassword}
                            onChange={handleRegisterChange}
                        />
                        <button type="submit">Регистрирай ме</button>
                    </form>
                </>
            ) : (
                <>
                    <h1>FitStack Вход</h1>
                    <form
                        onSubmit={handleLoginSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            maxWidth: "300px",
                            margin: "0 auto"
                        }}
                    >
                        <input
                            name="email"
                            type="email"
                            placeholder="Имейл"
                            value={loginData.email}
                            onChange={handleLoginChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Парола"
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />
                        <button type="submit">Влез</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default DumbPlaceholderComponent;