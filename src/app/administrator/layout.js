export default function Layout({ children }) {
    return (
        <html lang="es">
            <body>
            <header className="flex justify-center items-center w-full border bg-[#c66271] py-5">
                    <h1 className="font-extrabold text-4xl">Administrador</h1>
            </header>
                {children}
            </body>
        </html>
    )

}