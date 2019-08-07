# Image Resizer

Image resizer em node para servir arquivos de imagem.

A lib de resize é a Sharp e o processo passa por:
  - Verifica se a imagem já existe no tamanho requisitado
  - Se existe, exisbe a imagem.
  - Caso não exista aplica o resize, grava na pasta de definida em .env com os parametros informados na url e mostra a imagem
  