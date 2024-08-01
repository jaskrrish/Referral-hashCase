import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface MailComponentProps {
  email: string;
  otp: string;
}

export default function MailComponent({ email, otp }: MailComponentProps) {
  console.log("went till mail component");
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Forgot Password Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your forget Password code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {email},</Heading>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
      </Section>
    </Html>
  );
}
