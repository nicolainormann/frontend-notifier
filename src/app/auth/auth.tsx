import { Component, h } from "preact";
import { Translations } from "../../translations/translations";
import { AuthApi } from "../api/auth.api";
import { AuthCreateUser } from "./auth-create-user";
import { AuthLogin } from "./auth-login";
import { IAuthLoginState, IAuthState } from "./Auth.model";

export class Auth extends Component<any, IAuthState> {
    state: IAuthState = {
        create: false,
        form: {
            email: "",
            password: ""
        }
    };

    toggleCreate = () => {
        this.setState((current: IAuthState) => ({ create: !current.create }));
    }

    onChange = (auth: IAuthLoginState) => {
        this.setState({ form: auth });
    }

    onSubmit = (event: Event) => {
        event.preventDefault();
        this.state.create ? AuthApi.createUser(this.state.form.email, this.state.form.password) : AuthApi.login(this.state.form.email, this.state.form.password);
    }

    render() {
        const auth = (
            <form class="auth" onSubmit={this.onSubmit}>
                {this.state.create ? <AuthCreateUser onAuthChange={this.onChange} /> : <AuthLogin onAuthChange={this.onChange} />}

                <input class="auth__button button" type="submit" value={this.state.create ? Translations.auth.createUser : Translations.auth.login} />

                <button type="button" class="button button_link" onClick={this.toggleCreate}>
                    {this.state.create ? Translations.auth.login : Translations.auth.createUser}
                </button>
            </form>
        );

        return auth;
    }
}