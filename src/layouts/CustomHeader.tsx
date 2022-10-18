import Head from "next/head"
import { Component, ReactNode } from "react"

export default class CustomHeader extends Component<any, any> {

    render(): ReactNode {
        return (
            <Head>
                <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />
                <meta name="description" content="We are the engine of the future." />
                <meta property="og:image" content="/img/cover.jpg" />
                {this.props.children}
            </Head>
        )
    }
}
