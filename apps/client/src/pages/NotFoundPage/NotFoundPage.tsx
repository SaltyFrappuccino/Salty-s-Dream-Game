import { Link } from "react-router-dom";
import { PageContainer } from "../../components/layout/PageContainer/PageContainer";

export function NotFoundPage() {
  return (
    <PageContainer>
      <h1>Страница не найдена</h1>
      <Link to="/">Вернуться на главный экран</Link>
    </PageContainer>
  );
}
