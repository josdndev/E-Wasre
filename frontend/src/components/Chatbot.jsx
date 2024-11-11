import React, { useState, useEffect, useRef } from 'react';
import Groq from 'groq-sdk';
import ReactMarkdown from 'react-markdown'; // Importa react-markdown
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Importa la biblioteca para copiar al portapapeles
import { FaCopy } from 'react-icons/fa'; // Importa el ícono de copiar

// Inicializa Groq con la clave API desde la variable de entorno
const groq = new Groq({ 
    apiKey: import.meta.env.VITE_GROQ_API_KEY, 
    dangerouslyAllowBrowser: true // Habilita esta opción con precaución
});

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null); // Referencia para el final de los mensajes

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');

            try {
                const chatCompletion = await getGroqChatCompletion(input);
                const botResponse = chatCompletion.choices[0]?.message?.content || "No hay respuesta de Esteff-AI.";
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: botResponse, sender: 'bot' },
                ]);
            } catch (error) {
                console.error('Error al obtener la respuesta de Esteff-AI:', error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'Error al obtener la respuesta de Esteff-AI.', sender: 'bot' },
                ]);
            }
        }
    };

    const getGroqChatCompletion = async (userMessage) => {
        return await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: userMessage,
                },
            ],
            model: "llama3-8b-8192", // Asegúrate de que este modelo sea válido
        });
    };

    // Desplazar hacia abajo cuando se agreguen nuevos mensajes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-full w-full bg-transparent"> {/* Cambiado a w-full para ocupar todo el div */}
            <div className="flex-1 w-full overflow-hidden p-4">
                <div className="flex flex-col h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2 flex justify-start"> {/* Añadido flex para alinear los mensajes */}
                            {msg.sender === 'user' ? (
                                <div className="bg-[rgba(255,255,255,0.3)] w-9/10 border border-white text-white p-2 rounded-lg shadow-md"> {/* Fondo difuminado al 30% con sombra y ancho del 90% */}
                                    <strong>Tú:</strong> {msg.text}
                                </div>
                            ) : (
                                <div className="bg-[rgba(255,255,255,0.3)] w-9/10 border border-white text-white p-2 rounded-lg"> {/* Fondo difuminado al 30% y ancho del 90% */}
                                    <strong>Esteff-AI:</strong>
                                    <div>
                                        <ReactMarkdown
                                            components={{
                                                code({ node, inline, className, children, ...props }) {
                                                    const match = /language-(\w+)/.exec(className || '');
                                                    return !inline && match ? (
                                                        <div className="relative">
                                                            <CopyToClipboard text={String(children).replace(/\n$/, '')}>
                                                                <button className="absolute top-0 right-0 bg-transparent text-white p-1 rounded-lg flex items-center hover:bg-gray-800 transition duration-200">
                                                                    <FaCopy className="mr-1" /> {/* Ícono de copiar */}
                                                                </button>
                                                            </CopyToClipboard>
                                                            <SyntaxHighlighter
                                                                style={solarizedlight}
                                                                language={match[1]}
                                                                PreTag="div"
                                                                customStyle={{
                                                                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo transparente al 50%
                                                                    borderRadius: '8px', // Bordes redondeados
                                                                    border: 'none', // Sin borde
                                                                }}
                                                            >
                                                                {String(children).replace(/\n$/, '')}
                                                            </SyntaxHighlighter>
                                                        </div>
                                                    ) : (
                                                        <code className={className} {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                },
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Referencia para el final de los mensajes */}
                </div>
            </div>
            <form onSubmit={handleSendMessage} className="flex p-4 border-t border-white">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 p-2 border border-transparent bg-[rgba(255,255,255,0.3)] text-white placeholder-gray-400 focus:outline-none" 
                />
                <button type="submit" className="bg-transparent text-white p-2 rounded-lg ml-2">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Chat;
