import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailTemplatesService {
  getContactFormTemplate(data: {
    from: string;
    subject: string;
    body: string;
    currentYear?: number;
    name: string;
  }): string {
    const { from, subject, body, name } = data;

    return `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova Solicitação de Cliente - ${subject}</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="padding: 40px;">
                    <header style="text-align: center; margin-bottom: 30px;">
                        <img src="https://via.placeholder.com/150x50" alt="Logo da Sua Loja" style="max-width: 150px; height: auto;">
                    </header>

                    <main>
                        <h1 style="color: #4a4a4a; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Nova Solicitação de Cliente</h1>

                        <section style="margin-bottom: 30px;">
                            <h2 style="font-size: 18px; color: #2c3e50; margin-bottom: 15px;">Informações do Cliente</h2>
                            <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f8f9fa; border-radius: 5px;">
                                <tr>
                                    <td style="font-weight: bold; width: 100px;">Nome:</td>
                                    <td>${name}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; width: 100px;">Email:</td>
                                    <td>${from}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold;">Assunto:</td>
                                    <td>${subject}</td>
                                </tr>
                            </table>
                        </section>

                        <section>
                            <h2 style="font-size: 18px; color: #2c3e50; margin-bottom: 15px;">Conteúdo da Mensagem</h2>
                            <div style="background-color: #f8f9fa; border-radius: 5px; padding: 20px; white-space: pre-wrap;">${body}</div>
                        </section>
                    </main>

                    <footer style="margin-top: 40px; text-align: center; font-size: 14px; color: #7f8c8d; border-top: 1px solid #f0f0f0; padding-top: 20px;">
                        <p>Esta é uma mensagem automatizada do formulário de contato do seu site. Por favor, não responda a este e-mail.</p>
                        <p>&copy; ${new Date().getFullYear()} Kpax Store. Todos os direitos reservados.</p>
                    </footer>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
  }

  getResetPasswordTemplate(data: { name: string; resetLink: string }): string {
    const { name, resetLink } = data;

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redefinição de senha</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
  <h1 style="color: #4a4a4a;">Redefinição de senha</h1>
  <p>Olá, ${name},</p>
  <p>Recebemos uma solicitação para redefinir a senha da sua conta. Para redefinir sua senha, clique no link abaixo:</p>
  <a href="${resetLink}" style="display: inline-block; padding: 10px 15px; margin: 20px 0; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Redefinir minha senha</a>
  <p>Se você não solicitou a redefinição de senha, ignore este email.</p>
  <p>Atenciosamente,</p>
  <p>Equipe Kpax Store</p>
</body>
</html>
`;
  }
}
