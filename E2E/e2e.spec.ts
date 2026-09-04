import { test, expect } from '@playwright/test';
test('deve abrir página inicial', async ({ page }) => {
await page.goto('http://localhost:4200/');
await expect(page.getByText('TaskFlow')).toBeVisible();
});
test('deve adicionar uma tarefa', async ({ page }) => {
await page.goto('http://localhost:4200/');
await page.getByPlaceholder('Digite o título')
.fill('Estudar Playwright');
await page.getByPlaceholder('Detalhes da tarefa')
.fill('Criar testes E2E');
await page.getByRole('button', { name: 'Adicionar tarefa' })
.click();
await expect(
page.getByText('Estudar Playwright')
).toBeVisible();
});
test('deve concluir uma tarefa', async ({ page }) => {
await page.goto('http://localhost:4200/');
await page.getByPlaceholder('Digite o título')
.fill('Tarefa para concluir');
await page.getByPlaceholder('Detalhes da tarefa')


.fill('Detalhes da tarefa');
await page.getByRole('button', { name: 'Adicionar tarefa' })
.click();
const taskItem = page.locator('article.task-item', {
hasText: 'Tarefa para concluir'
});
await taskItem.locator('button.checkbox').click();
await expect(taskItem).toHaveClass(/completed/);
});
test('deve remover uma tarefa', async ({ page }) => {
await page.goto('http://localhost:4200/');
await page.getByPlaceholder('Digite o título')
.fill('Tarefa para remover');
await page.getByPlaceholder('Detalhes da tarefa')
.fill('Será removida em seguida');
await page.getByRole('button', { name: 'Adicionar tarefa' })
.click();
const taskItem = page.locator('article.task-item', {
hasText: 'Tarefa para remover'
});
await taskItem.getByRole('button', { name: 'Remover' }).click();
await expect(taskItem).not.toBeVisible();
});
test('deve navegar para estatísticas', async ({ page }) => {
await page.goto('http://localhost:4200/');
await page.getByRole('link', { name: 'Ver Estatísticas' })
.click();
await expect(
page.getByText('Estatísticas das Tarefas')
).toBeVisible();
await expect(
page.getByText('Tarefas Criadas')
).toBeVisible();
await expect(
page.getByText('Tarefas Excluídas')
).toBeVisible();
await expect(
page.getByText('Tarefas Concluídas')
).toBeVisible();
});