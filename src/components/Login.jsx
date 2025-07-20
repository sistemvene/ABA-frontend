// src/components/Login.jsx

import { useState } from "react";

import { session } from "../services/session_middleware";


export default function Login() {

  const [step, setStep] = useState("email"); // "email" | "otp"

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const handleRequestOTP = async () => {

    setError("");

    setLoading(true);

    try {

      await session.requestOTP(email);

      setStep("otp");

    } catch (err) {

      setError(err.error || "Error solicitando OTP");

    } finally {

      setLoading(false);

    }

  };


  const handleVerifyOTP = async () => {

    setError("");

    setLoading(true);

    try {

      await session.verifyOTP(email, otp);

      window.location.reload(); // o redirige al dashboard

    } catch (err) {

      setError(err.error || "OTP inválido");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">

        <h2 className="text-2xl font-semibold text-gray-800 text-center">

          {step === "email" ? "Bienvenido" : "Verifica tu OTP"}

        </h2>


        {error && (

          <div className="text-red-600 bg-red-100 p-2 rounded">

            {error}

          </div>

        )}


        {step === "email" && (

          <>

            <input

              type="email"

              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"

              placeholder="tu@correo.com"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

            />

            <button

              onClick={handleRequestOTP}

              disabled={!email || loading}

              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"

            >

              {loading ? "Enviando..." : "Enviar OTP"}

            </button>

          </>

        )}


        {step === "otp" && (

          <>

            <input

              type="text"

              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"

              placeholder="Código OTP"

              value={otp}

              onChange={(e) => setOtp(e.target.value)}

            />

            <button

              onClick={handleVerifyOTP}

              disabled={!otp || loading}

              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"

            >

              {loading ? "Verificando..." : "Verificar OTP"}

            </button>

            <button

              onClick={() => setStep("email")}

              className="mt-4 text-sm text-indigo-600 hover:underline"

            >

              Cambiar correo

            </button>

          </>

        )}

      </div>

    </div>

  );

}

