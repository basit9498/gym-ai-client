import { LoginForm } from '@/modules/auth';

export const metadata = {
  title: 'Sign In | BodyForgeAI Dashboard',
  description: 'Access your premium BodyForgeAI dashboard.',
};

export default function LoginPage() {
  return <LoginForm />;
}
