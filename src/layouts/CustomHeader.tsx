import Head from "next/head"
import { Component, ReactNode } from "react"

export default class CustomHeader extends Component<any, any> {

    render(): ReactNode {
        return (
            <Head>
                <link rel="icon" type="image/png" href="/img/favicon.png" />
                {this.props.children}
            </Head>
        )
    }
}
