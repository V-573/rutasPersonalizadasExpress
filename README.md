al momento de dar push para subir a mi repositorio remoto de github me salio un error y me toco hacer lo siguiente:
1ro: 
Iniciar el Agente SSH, Ejecutá este comando para asegurarte de que el agente esté corriendo:

Bash: 
eval "$(ssh-agent -s)"

2do: 
 ssh-add ~/.ssh/id_ed25519 
y sale: 
Identity added: /c/Users/jhone/.ssh/id_ed25519 (vaj573cali@gmail.com)