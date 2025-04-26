"use client";

import { useState } from "react";
import { auth, googleProvider } from '@/lib/firebase/config';
import { useRouter } from "next/navigation";
import LoginModal from "./components/LoginModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const goToNutritionForm = () => {
    router.push("/nutrition-form");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gradient-to-b from-[#fffde7] to-[#fcdbb5] flex flex-col items-center justify-between text-center px-6 font-sans overflow-x-hidden">
        {/* Conteúdo principal */}
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md mx-auto py-10">
          {/* Logo */}
          <img
            src="/LogoNutrana.svg"
            alt="Logo de Nutrana"
            className="w-[200px] md:w-[500px] h-auto mb-2"
          />

          {/* Títulos */}
          <div className="flex flex-col gap-y-[-10px]">
            <h1 className="text-3xl md:text-3xl font-extrabold text-[#9c7800] -mb-1 md:-mb-2">
              COME MEJOR,
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-[#9c7800] mb-10">
              Obtén Resultados
            </h2>

            {/* Subtítulo */}
            <p className="mb-8 text-[#0a3a2a]/90 max-w-md font-medium text-sm md:text-base">
              Plan nutricional personalizado en <strong>2 minutos</strong>.<br />
              Descubre tu plan alimenticio ideal basado en
              <br /> tu cuerpo, metas y estilo de vida.
            </p>

            {/* Botão principal */}
            <button
              className="bg-white text-[#0a3a2a] px-6 py-3 rounded-xl hover:bg-[#ecff83] mb-4 font-semibold transition-all"
              onClick={goToNutritionForm}
            >
              Comenzar Ahora
            </button>
          </div>

          {/* Link de login */}
          <button
            className="text-sm text-[#9c7800]/80 hover:underline font-normal bg-transparent border-none p-0 cursor-pointer"
            onClick={openModal}
            aria-haspopup="dialog"
          >
            ¿Ya tienes una cuenta? <strong>Inicia sesión</strong>
          </button>
        </div>

        {/* Imagens */}
        <div className="relative w-full mt-8 mb-12 px-4">
          <div className="relative max-w-[280px] md:max-w-[400px] lg:max-w-[700px] mx-auto aspect-square">
            <img 
              src="/Model_Fruit_COLOR.png" 
              alt="Fruit Model Color" 
              className="absolute inset-0 w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-700"
            />
            <img 
              src="/Model_Fruit_BW.png" 
              alt="Fruit Model Black and White" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </main>

      {/* Rodapé corrigido */}
      <footer className="bg-[#0a3a2a] text-white py-8 w-full">
        <div className="w-full mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
            <div className="mb-6 md:mb-0 flex flex-col items-center justify-center">
              <div className="flex justify-center items-center w-full">
                <img 
                  src="/logo_BRANCA.svg" 
                  alt="Logo Nutrana" 
                  className="h-auto max-h-16 w-auto max-w-[100px]"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className="text-gray-300 mt-2 text-center">Come mejor, <br />Obtén Resultados</p>
            </div>

            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-3 text-[#06e96c]">Siga-nos</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-[#06e96c] transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-[#06e96c] transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-[#06e96c] transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#06e96c]">Contato</h3>
              <ul className="text-gray-300 space-y-1">
                <li>contato@nutrana.com</li>
                <li>(11) 1234-5678</li>
                <li>Rua Nutrição, 123 - São Paulo/SP</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300 max-w-7xl mx-auto">
            <p>&copy; {new Date().getFullYear()} NUTRANA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Login */}
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}