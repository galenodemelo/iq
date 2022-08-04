import Head from "next/head"
import { Component, ReactNode } from "react"

export default class CustomHeader extends Component<any, any> {

    render(): ReactNode {
        return (
            <Head>
                <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />
                {this.props.children}
            </Head>
        )
    }
}
