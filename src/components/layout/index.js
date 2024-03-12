import Navigation from "../navigation";
import Footer from "../footer";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { connect } from 'react-redux';

const Layout = ({ children, login }) => {

    useEffect(() => {
        if (Cookies.get("dollup_client_user")) {
            const user = JSON.parse(Cookies.get("dollup_client_user"))
            login(user)
        }
    }
    , []);

    return (
        <div className="layout bg-[url('/images/bg.jpg')] bg-cover">
            <Navigation />
            <main>{children}</main>
            <Footer />
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    login: (user) =>dispatch({
        type: "LOGIN",
        payload: user
    })
})

export default connect(null, mapDispatchToProps)(Layout);
