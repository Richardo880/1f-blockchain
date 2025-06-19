# Guía de Despliegue - Protocolo de Lending

Esta guía te llevará paso a paso para desplegar completamente el sistema de lending desde cero, incluyendo los contratos inteligentes y la aplicación web.

## 📋 Prerrequisitos

### Software Requerido

1. **Node.js** (versión 18 o superior)
   ```bash
   # Verificar versión
   node --version
   npm --version
   ```

2. **Git**
   ```bash
   # Verificar instalación
   git --version
   ```

3. **MetaMask** (extensión del navegador)
   - Instalar desde [metamask.io](https://metamask.io/)

### Conocimientos Básicos
- Familiaridad con terminal/command line
- Conceptos básicos de blockchain y Ethereum
- Conocimiento básico de JavaScript/React

## 🚀 Instalación y Configuración

### Paso 1: Clonar el Repositorio

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd blockchain-final/lending-dapp

# Verificar estructura del proyecto
ls -la
```

### Paso 2: Instalar Dependencias

```bash
# Instalar dependencias de Hardhat (contratos)
npm install

# Verificar que se instalaron correctamente
ls node_modules
```

### Paso 3: Configurar Variables de Entorno

```bash
# Crear archivo de variables de entorno
touch .env

# Editar el archivo .env con tu configuración
nano .env
```

**Contenido del archivo `.env`:**
```env
# Clave privada de tu wallet (para despliegue)
PRIVATE_KEY=tu_clave_privada_aqui

# URL de la red (ejemplos)
# Para Ethereum Mainnet:
# RPC_URL=https://mainnet.infura.io/v3/TU_PROJECT_ID

# Para Sepolia Testnet:
RPC_URL=https://sepolia.infura.io/v3/TU_PROJECT_ID

# Para Polygon Mumbai:
# RPC_URL=https://polygon-mumbai.infura.io/v3/TU_PROJECT_ID

# Para red local (Hardhat):
# RPC_URL=http://127.0.0.1:8545
```

### Paso 4: Configurar Hardhat

Editar `hardhat.config.js` según tu red objetivo:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    // Red local para desarrollo
    hardhat: {
      chainId: 1337
    },
    
    // Sepolia Testnet
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    },
    
    // Polygon Mumbai
    mumbai: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80001
    },
    
    // Ethereum Mainnet (¡CUIDADO!)
    mainnet: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1
    }
  },
  
  // Configuración para verificación de contratos
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
```

## 🔧 Despliegue de Contratos

### Paso 1: Verificar Configuración

```bash
# Verificar que Hardhat puede compilar los contratos
npx hardhat compile

# Deberías ver algo como:
# Compiled 4 Solidity files successfully
```

### Paso 2: Ejecutar Tests (Opcional pero Recomendado)

```bash
# Ejecutar todos los tests
npm test

# Deberías ver todos los tests pasando ✅
```

### Paso 3: Desplegar en Red Local (Desarrollo)

```bash
# Iniciar nodo local de Hardhat
npx hardhat node

# En otra terminal, desplegar contratos
npx hardhat run scripts/deploy.js --network localhost
```

### Paso 4: Desplegar en Testnet (Recomendado para pruebas)

```bash
# Asegúrate de tener ETH en tu wallet de testnet
# Para Sepolia: https://sepoliafaucet.com/

# Desplegar en Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Deberías ver las direcciones de los contratos desplegados
```

### Paso 5: Verificar Contratos (Opcional)

```bash
# Obtener API key de Etherscan
# https://etherscan.io/apis

# Agregar a .env
echo "ETHERSCAN_API_KEY=tu_api_key_aqui" >> .env

# Verificar contratos
npx hardhat verify --network sepolia DIRECCION_DEL_CONTRATO
```

## 🌐 Despliegue de la Aplicación Web

### Paso 1: Configurar la Aplicación React

```bash
# Navegar al directorio de la aplicación web
cd web_app

# Instalar dependencias
npm install

# Verificar instalación
npm list
```

### Paso 2: Configurar Direcciones de Contratos

Editar `src/contractABI.json` con las direcciones de los contratos desplegados:

```json
{
  "lendingProtocol": "DIRECCION_DEL_PROTOCOLO",
  "collateralToken": "DIRECCION_DEL_TOKEN_COLATERAL",
  "loanToken": "DIRECCION_DEL_TOKEN_PRESTAMO"
}
```

### Paso 3: Configurar Red en MetaMask

1. **Abrir MetaMask**
2. **Agregar red personalizada:**
   - **Sepolia Testnet:**
     - Nombre: Sepolia
     - RPC URL: https://sepolia.infura.io/v3/TU_PROJECT_ID
     - Chain ID: 11155111
     - Símbolo: ETH

### Paso 4: Ejecutar Aplicación en Desarrollo

```bash
# Desde el directorio web_app
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Paso 5: Desplegar Aplicación en Producción

```bash
# Construir para producción
npm run build

# Los archivos estarán en dist/
# Subir a tu hosting preferido (Vercel, Netlify, etc.)
```

## 🔗 Configuración Post-Despliegue

### Paso 1: Configurar Tokens Iniciales

```bash
# Script para configurar tokens iniciales
npx hardhat run scripts/setup-tokens.js --network sepolia
```

### Paso 2: Verificar Funcionalidad

1. **Conectar MetaMask** a la aplicación
2. **Aprobar tokens** para el protocolo
3. **Depositar colateral**
4. **Solicitar préstamo**
5. **Pagar deuda**
6. **Retirar colateral**

## 🛠️ Scripts Útiles

### Scripts de Despliegue

```bash
# Desplegar solo contratos
npx hardhat run scripts/deploy.js --network sepolia

# Desplegar y verificar
npx hardhat run scripts/deploy-and-verify.js --network sepolia

# Configurar tokens iniciales
npx hardhat run scripts/setup-tokens.js --network sepolia
```

### Scripts de Mantenimiento

```bash
# Actualizar parámetros del protocolo
npx hardhat run scripts/update-params.js --network sepolia

# Migrar datos de usuarios
npx hardhat run scripts/migrate-data.js --network sepolia
```

## 🔒 Consideraciones de Seguridad

### Antes del Despliegue en Mainnet

1. **Auditoría de Seguridad**
   - Contratar auditoría profesional
   - Revisar vulnerabilidades conocidas

2. **Tests Exhaustivos**
   - Ejecutar tests en múltiples redes
   - Probar casos edge y de stress

3. **Configuración de Redes**
   - Usar nodos RPC confiables
   - Configurar múltiples proveedores

4. **Gestión de Claves**
   - Usar wallets hardware
   - Implementar multisig
   - Nunca compartir claves privadas

### Configuración de Producción

```javascript
// hardhat.config.js para producción
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    mainnet: {
      url: process.env.MAINNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 20000000000, // 20 gwei
      timeout: 60000
    }
  }
};
```

## 🐛 Solución de Problemas

### Errores Comunes

1. **"Insufficient funds"**
   ```bash
   # Obtener ETH de testnet
   # Sepolia: https://sepoliafaucet.com/
   # Mumbai: https://faucet.polygon.technology/
   ```

2. **"Nonce too high"**
   ```bash
   # Resetear MetaMask
   # Settings > Advanced > Reset Account
   ```

3. **"Contract not found"**
   ```bash
   # Verificar direcciones en contractABI.json
   # Verificar red en MetaMask
   ```

4. **"Gas estimation failed"**
   ```bash
   # Aumentar gas limit
   # Verificar parámetros de la transacción
   ```

### Logs y Debugging

```bash
# Ver logs detallados
npx hardhat run scripts/deploy.js --network sepolia --verbose

# Debug con console.log
npx hardhat console --network sepolia
```

## 📊 Monitoreo y Mantenimiento

### Herramientas de Monitoreo

1. **Etherscan/Polyscan**
   - Monitorear transacciones
   - Verificar contratos

2. **The Graph**
   - Indexar eventos
   - Crear APIs

3. **Tenderly**
   - Debugging de transacciones
   - Alertas de errores

### Mantenimiento Regular

```bash
# Actualizar dependencias
npm update

# Ejecutar tests
npm test

# Verificar seguridad
npm audit

# Actualizar contratos si es necesario
npx hardhat run scripts/upgrade.js --network sepolia
```

## 📞 Soporte

### Recursos Útiles

- **Documentación Hardhat**: https://hardhat.org/docs
- **Documentación Ethers.js**: https://docs.ethers.org/
- **OpenZeppelin**: https://docs.openzeppelin.com/
- **MetaMask**: https://docs.metamask.io/

### Comunidad

- **Stack Overflow**: Etiquetas `hardhat`, `ethereum`, `solidity`
- **Discord**: Hardhat, Ethereum
- **Reddit**: r/ethereum, r/ethdev

---

## ✅ Checklist de Despliegue

- [ ] Node.js instalado (v18+)
- [ ] Git instalado
- [ ] MetaMask instalado
- [ ] Repositorio clonado
- [ ] Dependencias instaladas
- [ ] Variables de entorno configuradas
- [ ] Hardhat configurado
- [ ] Tests ejecutados y pasando
- [ ] Contratos desplegados en testnet
- [ ] Contratos verificados (opcional)
- [ ] Aplicación web configurada
- [ ] MetaMask conectado a la red correcta
- [ ] Funcionalidad básica probada
- [ ] Documentación actualizada

¡Tu sistema de lending está listo para usar! 🎉 