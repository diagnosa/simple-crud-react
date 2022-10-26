import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "./Navbar";

export default function Layout({title, children}) {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title} | Learning</title>
            </Helmet>
            <Navbar />
            <section >
                <h1>{title} Page</h1>
                {children}
            </section>
        </HelmetProvider>
    )
} 
