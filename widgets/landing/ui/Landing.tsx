import { AuthSwitcher } from "@/features/auth/ui/AuthSwitcher";

export function Landing() {
  return (
    <div className="flex">
      <div className="max-w-lg">
        <h1>TimerHunt</h1>
        <p>
          Отслеживайте время работы, учебы, отдыха, доход и статистику вашей
          жизни.
        </p>
      </div>
      <AuthSwitcher />
    </div>
  );
}
