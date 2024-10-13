import {
    Html,
    Head,
    Preview,
    Heading,
    Section,
    Text,
    Button,
    Container,
    Body
} from '@react-email/components'

interface VerificationEmailProps {
    username: string;
    verifycode: string;
}

export default function VerificationEmail({ username, verifycode }: VerificationEmailProps) {
    return (

        <Html>
            <Head>
                <title>Email Verification - AnonFeedback</title>
            </Head>
            <Preview>Complete your email verification to get started</Preview>
            <Body style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
                <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px' }}>
                    <Section>
                        <Heading style={{ fontSize: '20px', color: '#333' }}>Hi, {username}</Heading>
                        <Text style={{ fontSize: '16px', color: '#555' }}>
                            Thank you for starting the journey with AnonFeedback! <br />
                            Your OTP for verification is: <strong>{verifycode}</strong>
                        </Text>

                        <Button href={`https://aanonfeedback0.vercel.app/verify/${username}`} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}>
                            Verify Now
                        </Button>
                    </Section>
                </Container>
            </Body>
        </Html>

    )
}
