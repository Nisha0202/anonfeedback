import {
    Html,
    Head,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from '@react-email/components'

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
        <Html>
            <Head>
                <title>Verify Email</title>
            </Head>
            <Preview>Your verification email</Preview>
            <Section>
                <Heading>Hi {username},</Heading>
                <Text>Your OTP for verification is: {otp}</Text>
                <Button href="#">Verify Now</Button>
            </Section>
        </Html>
    )
}
