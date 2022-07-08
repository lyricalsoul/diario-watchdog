import { MessageBuilder, Webhook } from 'discord-webhook-node'

const hook = new Webhook(process.env.WEBHOOK_URL)
const name = 'Diário Eletrônico'
const avatar =
  'https://diario.seduc.ro.gov.br/public/img/icons/icon-192x192.png'

hook.setUsername(name)
hook.setAvatar(avatar)

export const notifyToDiscord = (...subjects) => {
  const embed = new MessageBuilder()
  .setTitle('Alteração de notas')
  .setColor('20383')
  .setTimestamp()
  .setDescription(`As seguintes notas foram alteradas:\n**${subjects.join(' - ')}**\n\n[Acesse o portal para ver suas notas - clique aqui.](https://diario.seduc.ro.gov.br/portal/login.php)`)
  
  return hook.send(embed)
}