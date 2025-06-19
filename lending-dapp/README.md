# Protocolo de Lending - DeFi

Un protocolo de lending descentralizado construido con Solidity y React, que permite a los usuarios depositar colateral y solicitar préstamos.

## 📋 Características

- **Depósito de Colateral**: Los usuarios pueden depositar tokens cUSD como colateral
- **Préstamos**: Solicitar préstamos en tokens dDAI hasta un 66.67% del colateral
- **Tasa de Interés**: 5% fijo por periodo
- **Ratio de Colateralización**: 150% (requiere 1.5x el valor del préstamo en colateral)
- **Pago de Deudas**: Pagar préstamos con intereses
- **Retiro de Colateral**: Retirar colateral cuando no hay deuda pendiente

## 🏗️ Arquitectura

### Contratos Inteligentes

- **LendingProtocol.sol**: Contrato principal del protocolo
- **CollateralToken.sol**: Token de colateral (cUSD)
- **LoanToken.sol**: Token de deuda (dDAI)

### Aplicación Web

- **React + Vite**: Frontend moderno y rápido
- **Ethers.js v6**: Interacción con blockchain
- **MetaMask**: Conexión de wallet

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v18+)
- npm o yarn
- MetaMask

### Instalación

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd lending-dapp

# Instalar dependencias
npm install

# Instalar dependencias de la aplicación web
cd web_app
npm install
```

### Desarrollo Local

```bash
# Compilar contratos
npx hardhat compile

# Ejecutar tests
npm test

# Iniciar nodo local
npx hardhat node

# Desplegar contratos (en otra terminal)
npx hardhat run scripts/deploy.js --network localhost

# Iniciar aplicación web
cd web_app
npm run dev
```

## 📖 Documentación

- **[Guía de Despliegue](DEPLOY_README.md)**: Instrucciones completas para desplegar el sistema
- **[Tests](TEST_README.md)**: Documentación de los tests unitarios y de integración

## 🔧 Configuración

### Variables de Entorno

Copia `env.example` a `.env` y configura:

```env
PRIVATE_KEY=tu_clave_privada
RPC_URL=https://sepolia.infura.io/v3/TU_PROJECT_ID
ETHERSCAN_API_KEY=tu_api_key
```

### Redes Soportadas

- **Hardhat Local**: Desarrollo local
- **Sepolia**: Testnet de Ethereum
- **Mumbai**: Testnet de Polygon
- **Ethereum Mainnet**: Producción (¡cuidado!)

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests específicos
npx hardhat test test/LendingProtocol.test.js
npx hardhat test test/Integration.test.js
```

## 📊 Funcionalidades del Protocolo

### Para Usuarios

1. **Depositar Colateral**
   - Aprobar tokens cUSD
   - Depositar en el protocolo
   - Ver colateral disponible

2. **Solicitar Préstamo**
   - Calcular límite disponible
   - Solicitar tokens dDAI
   - Ver deuda y intereses

3. **Pagar Deuda**
   - Aprobar tokens dDAI
   - Pagar deuda + intereses
   - Resetear deuda

4. **Retirar Colateral**
   - Solo sin deuda pendiente
   - Recibir tokens cUSD de vuelta

### Parámetros del Protocolo

- **Tasa de Interés**: 5% fijo
- **Ratio de Colateralización**: 150%
- **Límite de Préstamo**: 66.67% del colateral

## 🔒 Seguridad

- Contratos auditados y testeados
- Validaciones exhaustivas
- Manejo de casos edge
- Prevención de ataques comunes

## 🛠️ Scripts Útiles

```bash
# Despliegue completo
npx hardhat run scripts/deploy-and-verify.js --network sepolia

# Configurar tokens iniciales
npx hardhat run scripts/setup-tokens.js --network sepolia

# Verificar contratos
npx hardhat verify --network sepolia DIRECCION_CONTRATO
```

## 📈 Roadmap

- [ ] Interfaz de administración
- [ ] Múltiples tipos de colateral
- [ ] Tasas de interés variables
- [ ] Liquidaciones automáticas
- [ ] Integración con oráculos
- [ ] Mobile app

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/tu-repo/issues)
- **Documentación**: [DEPLOY_README.md](DEPLOY_README.md)
- **Tests**: [TEST_README.md](TEST_README.md)

---

**⚠️ Advertencia**: Este es un proyecto educativo. No use en producción sin auditoría de seguridad profesional.
