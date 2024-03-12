import Navigation from "../navigation";
import Footer from "../footer";

const Layout = ({ children }) => {
    return (
        <div className="layout bg-[url('/images/bg.jpg')] bg-cover">
            <Navigation />
            <main>{children}</main>
            <Footer />
        </div>
    )
}


export default Layout;