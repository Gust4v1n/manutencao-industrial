import React, { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export default function ManutencaoIndApp() {
  // Estado para armazenar a string Base64 da imagem capturada
  const [payloadEngine, setPayloadEngine] = useState('');
  // Estado para armazenar o webPath (URL para renderizar a imagem no DOM)
  const [imagemPreview, setImagemPreview] = useState('');
  // Estado para mensagens de status/erro
  const [status, setStatus] = useState('');
  // Estado para indicar carregamento
  const [carregando, setCarregando] = useState(false);

  /**
   * Captura uma foto SOMENTE pela câmera (CameraSource.Camera)
   * e retorna o resultado em Base64 para envio via JSON.
   */
  const registrarFalha = async () => {
    try {
      setCarregando(true);
      setStatus('');

      const image = await Camera.getPhoto({
        quality: 70,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        allowEditing: false,
        saveToGallery: false,
      });

      setPayloadEngine(image.base64String);
      // Monta a URL de dados para exibição no DOM
      setImagemPreview(`data:image/${image.format};base64,${image.base64String}`);
      setStatus('✅ Foto capturada com sucesso pela câmera!');
    } catch (error) {
      // Tratamento de exceção: usuário cancelou ou ocorreu erro
      console.warn('Câmera cancelada ou erro:', error);
      setStatus('⚠️ Ação cancelada pelo usuário ou erro na câmera.');
    } finally {
      setCarregando(false);
    }
  };

  /**
   * Permite ao usuário escolher entre Câmera ou Galeria
   * (CameraSource.Prompt exibe o diálogo nativo do Android).
   * Retorna webPath para renderização direta no DOM.
   */
  const tirarFotoOuGaleria = async () => {
    try {
      setCarregando(true);
      setStatus('');

      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt, // Exibe o prompt do sistema: "Câmera ou Galeria"
        allowEditing: false,
        promptLabelHeader: 'Selecione a origem',
        promptLabelPhoto: '📷 Câmera',
        promptLabelPicture: '🖼️ Galeria',
      });

      // Usa webPath para renderizar a imagem na WebView
      setImagemPreview(image.webPath);
      setPayloadEngine(''); // Limpa base64 anterior (foi usado URI desta vez)
      setStatus('✅ Imagem obtida com sucesso!');
    } catch (error) {
      // Tratamento de exceção: usuário cancelou (apertou "Voltar" ou cancelou)
      console.warn('Ação cancelada ou erro:', error);
      setStatus('⚠️ Ação cancelada pelo usuário. App continua funcionando normalmente.');
    } finally {
      setCarregando(false);
    }
  };

  /**
   * Limpa a imagem e os estados para nova captura.
   */
  const limparImagem = () => {
    setPayloadEngine('');
    setImagemPreview('');
    setStatus('');
  };

  return (
    <div style={styles.container}>
      {/* Cabeçalho do componente */}
      <div style={styles.header}>
        <h3 style={styles.title}>🔧 Manutenção de Motores Trifásicos</h3>
        <p style={styles.subtitle}>Registro fotográfico de falhas</p>
      </div>

      {/* Botões de ação */}
      <div style={styles.buttonGroup}>
        <button
          onClick={registrarFalha}
          disabled={carregando}
          style={{ ...styles.button, ...styles.buttonRed }}
        >
          {carregando ? '⏳ Aguarde...' : '📸 Fotografar Falha do Motor'}
        </button>

        <button
          onClick={tirarFotoOuGaleria}
          disabled={carregando}
          style={{ ...styles.button, ...styles.buttonBlue }}
        >
          {carregando ? '⏳ Aguarde...' : '📷 Tirar Foto / Galeria'}
        </button>
      </div>

      {/* Mensagem de status */}
      {status && (
        <div style={{
          ...styles.statusBox,
          backgroundColor: status.includes('✅') ? '#dcfce7' : '#fef3c7',
          borderColor: status.includes('✅') ? '#86efac' : '#fcd34d',
        }}>
          <p style={styles.statusText}>{status}</p>
        </div>
      )}

      {/* Pré-visualização da imagem capturada no DOM */}
      {imagemPreview && (
        <div style={styles.previewContainer}>
          <h4 style={styles.previewTitle}>📋 Pré-visualização da Falha</h4>
          <img
            src={imagemPreview}
            alt="Foto da falha do motor"
            style={styles.previewImage}
          />
          <button onClick={limparImagem} style={{ ...styles.button, ...styles.buttonGray, marginTop: '8px' }}>
            🗑️ Limpar Imagem
          </button>
        </div>
      )}

      {/* Exibição do payload Base64 (parcial) para comprovar geração */}
      {payloadEngine && (
        <div style={styles.base64Box}>
          <p style={styles.base64Label}>🔑 Payload Base64 (para envio JSON):</p>
          <p style={styles.base64Text}>
            {payloadEngine.substring(0, 80)}...
          </p>
          <p style={styles.base64Size}>
            Tamanho: {(payloadEngine.length / 1024).toFixed(1)} KB
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Estilos inline ─── */
const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  header: {
    marginBottom: '16px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.125rem',
    color: '#0f172a',
    margin: 0,
  },
  subtitle: {
    fontSize: '0.8rem',
    color: '#64748b',
    marginTop: '4px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '12px',
  },
  button: {
    border: 'none',
    borderRadius: '8px',
    padding: '14px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    width: '100%',
  },
  buttonRed: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
  },
  buttonBlue: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
  },
  buttonGray: {
    backgroundColor: '#94a3b8',
    color: '#ffffff',
    fontSize: '0.875rem',
    padding: '10px 16px',
  },
  statusBox: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid',
    marginBottom: '12px',
  },
  statusText: {
    fontSize: '0.875rem',
    margin: 0,
  },
  previewContainer: {
    marginTop: '12px',
    textAlign: 'center',
  },
  previewTitle: {
    fontSize: '0.95rem',
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: '8px',
  },
  previewImage: {
    width: '100%',
    maxWidth: '360px',
    borderRadius: '10px',
    border: '2px solid #cbd5e1',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  base64Box: {
    marginTop: '12px',
    backgroundColor: '#e2e8f0',
    padding: '10px 12px',
    borderRadius: '8px',
  },
  base64Label: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: '#334155',
    margin: '0 0 4px 0',
  },
  base64Text: {
    fontSize: '0.625rem',
    fontFamily: 'monospace',
    color: '#475569',
    wordBreak: 'break-all',
    margin: '0 0 4px 0',
  },
  base64Size: {
    fontSize: '0.7rem',
    color: '#64748b',
    margin: 0,
  },
};
