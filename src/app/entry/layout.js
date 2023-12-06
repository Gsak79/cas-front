export default function Layout({ children }) {
    return (
        <html lang="es">
            <body>
            <header className="flex justify-center items-center w-full border bg-[#c66271] py-5">
                <h1 className="font-extrabold text-4xl">Mi Diario <span className="text-[#6d00a1]">CAS</span> <span className="font-light text-sm"> por Alvaro Sakuda</span></h1>
            </header>
                {children}
            </body>
        </html>
    )
}