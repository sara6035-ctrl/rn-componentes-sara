mport React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions, 
  TextInput, 
  StatusBar, 
  PixelRatio,
  ScrollView
} from 'react-native';

export default function App() {
  const [pantallaActual, setPantallaActual] = useState('menu');
  const [verCategoriasActivo, setVerCategoriasActivo] = useState(false);
  
  // Forzamos dimensiones realistas de teléfono móvil (390 x 844 dp equivalen a un iPhone 13 Pro)
  const dimensionesCelular = { width: 390, height: 844 };
  const [sbOculto, setSbOculto] = useState(false);
  const [sbEstilo, setSbEstilo] = useState('light-content');

  // --- RENDERIZADO CONDICIONAL DE PANTALLAS ---

  // 1. MENÚ PRINCIPAL
  const renderMenu = () => (
    <View style={styles.contenidoCelular}>
      <Text style={styles.tituloPrincipal}>Panel de Pruebas Móviles</Text>
      <Text style={styles.subtituloMenu}>Desarrollador: SARA</Text>
      
      <View style={styles.tarjeta}>
        <TouchableOpacity style={styles.botonMenu} onPress={() => setPantallaActual('dimensiones')}>
          <Text style={styles.textoBoton}>1. Dimensiones y Distribución</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonMenu} onPress={() => setPantallaActual('interfaces')}>
          <Text style={styles.textoBoton}>2. Interfaces Nativas y APIs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonMenu} onPress={() => setPantallaActual('proporcion')}>
          <Text style={styles.textoBoton}>3. Proporción de Píxeles e Imágenes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonMenu} onPress={() => setPantallaActual('statusbar')}>
          <Text style={styles.textoBoton}>4. Controlador StatusBar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // 2. PANTALLA: DIMENSIONES Y DISTRIBUCIÓN
  const renderDimensiones = () => (
    <View style={styles.contenidoCelular}>
      <Text style={styles.titulo}>Dimensiones y distribución</Text>
      <View style={styles.tarjeta}>
        <Text style={styles.subtituloSeccion}>Dimensiones de Pantalla Activa</Text>
        
        <View style={styles.filaDato}><Text style={styles.etiqueta}>Ancho:</Text><Text style={styles.valor}>{dimensionesCelular.width.toFixed(1)} dp</Text></View>
        <View style={styles.filaDato}><Text style={styles.etiqueta}>Alto:</Text><Text style={styles.valor}>{dimensionesCelular.height.toFixed(1)} dp</Text></View>
        <View style={styles.filaDato}><Text style={styles.etiqueta}>Escala Física:</Text><Text style={styles.valor}>x3.00</Text></View>
        <View style={styles.filaDato}><Text style={styles.etiqueta}>Escala Fuente:</Text><Text style={styles.valor}>x1</Text></View>

        <TouchableOpacity style={styles.botonVolver} onPress={() => setPantallaActual('menu')}>
          <Text style={styles.textoBoton}>Volver al Menú</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // 3. PANTALLA: INTERFACES NATIVAS Y APIS (CON VER CATEGORÍAS CORREGIDO)
  const renderInterfaces = () => (
    <View style={styles.contenidoCelular}>
      <Text style={styles.titulo}>Interfaces nativas y APIs</Text>
      <ScrollView contentContainerStyle={styles.tarjetaCentrada} showsVerticalScrollIndicator={false}>
        <Text style={styles.badgeNativo}>INTERFAZ NATIVO</Text>
        
        <View style={styles.cajaDesarrollador}>
          <Text style={styles.textoDesarrollador}>Desarrollador: SARA</Text>
          <Text style={styles.subtextoApi}>Componentes UI & API Nativa</Text>
        </View>

        <TextInput style={styles.input} placeholder="Tu nombre" placeholderTextColor="#556581" />
        <TextInput style={styles.input} placeholder="Tu edad" placeholderTextColor="#556581" keyboardType="numeric" />

        {/* Botón funcional de Ver Categorías */}
        <TouchableOpacity 
          style={[styles.botonOutline, verCategoriasActivo && styles.botonOutlineActivo]} 
          onPress={() => setVerCategoriasActivo(!verCategoriasActivo)}
        >
          <Text style={styles.textoBotonOutline}>
            {verCategoriasActivo ? "OCULTAR CATEGORÍAS" : "VER CATEGORÍAS"}
          </Text>
        </TouchableOpacity>

        {/* Listado dinámico interactivo de Categorías */}
        {verCategoriasActivo && (
          <View style={styles.contenedorCategoriasLive}>
            <Text style={styles.itemCategoria}>• Componentes de Texto</Text>
            <Text style={styles.itemCategoria}>• Vista de Desplazamiento</Text>
            <Text style={styles.itemCategoria}>• APIs de Almacenamiento</Text>
          </View>
        )}

        <TouchableOpacity style={styles.botonCyan}>
          <Text style={styles.textoBotonNegro}>ENVIAR AHORA</Text>
        </TouchableOpacity>

        <View style={styles.filaBotones}>
          <TouchableOpacity style={styles.botonCuadrado} onPress={() => setPantallaActual('menu')}>
            <Text style={styles.textoBotonChico}>Menú</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonCuadrado} onPress={() => setPantallaActual('proporcion')}>
            <Text style={styles.textoBotonChico}>Sig.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  // 4. PANTALLA: PROPORCIÓN DE PÍXELES
  const renderProporcion = () => {
    const tamanoLayout = 40;
    return (
      <View style={styles.contenidoCelular}>
        <Text style={styles.titulo}>Proporción de píxeles e imágenes</Text>
        <View style={styles.tarjeta}>
          <Text style={styles.subtituloSeccion}>Render Real vs Físico</Text>
          
          <View style={styles.seccionPixeles}>
            <Text style={styles.textoPixelLabel}>Tamaño Layout: <Text style={styles.resaltado}>{tamanoLayout}dp</Text></Text>
            <View style={[styles.bloqueColor, { width: tamanoLayout, height: tamanoLayout, backgroundColor: '#ff4757' }]} />
          </View>

          <View style={styles.seccionPixeles}>
            <Text style={styles.textoPixelLabel}>Píxeles Físicos (x3): <Text style={styles.resaltado}>120px</Text></Text>
            <View style={[styles.bloqueColor, { width: tamanoLayout * 3, height: tamanoLayout * 3, backgroundColor: '#2ed573' }]} />
          </View>

          <TouchableOpacity style={styles.botonVolver} onPress={() => setPantallaActual('menu')}>
            <Text style={styles.textoBoton}>Volver al Menú</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // 5. PANTALLA: CONTROLADOR STATUSBAR
  const renderStatusBar = () => (
    <View style={styles.contenidoCelular}>
      <StatusBar barStyle={sbEstilo} hidden={sbOculto} animated={true} />
      <Text style={styles.titulo}>Controlador StatusBar</Text>
      <View style={styles.tarjeta}>
        <Text style={styles.subtituloSeccion}>Controlador Live</Text>

        <TouchableOpacity style={styles.botonVerde} onPress={() => setSbOculto(!sbOculto)}>
          <Text style={styles.textoBoton}>{sbOculto ? "Mostrar Barra" : "Ocultar Barra"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonAzul} onPress={() => setSbEstilo(sbEstilo === 'light-content' ? 'dark-content' : 'light-content')}>
          <Text style={styles.textoBoton}>Alternar Estilo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonVolver} onPress={() => setPantallaActual('menu')}>
          <Text style={styles.textoBoton}>Volver al Menú</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // El contenedor raíz centra la simulación del celular sobre el fondo web blanco
  return (
    <View style={styles.contenedorPantallaCompletaWeb}>
      <View style={styles.marcoCelularFisico}>
        {pantallaActual === 'menu' && renderMenu()}
        {pantallaActual === 'dimensiones' && renderDimensiones()}
        {pantallaActual === 'interfaces' && renderInterfaces()}
        {pantallaActual === 'proporcion' && renderProporcion()}
        {pantallaActual === 'statusbar' && renderStatusBar()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Enmarca y limita la app al tamaño exacto de un dispositivo móvil centrado en pantalla
  contenedorPantallaCompletaWeb: { flex: 1, backgroundColor: '#f0f2f5', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' },
  marcoCelularFisico: { width: 390, height: 844, backgroundColor: '#090d16', borderRadius: 40, borderWidth: 12, borderColor: '#1e2538', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  contenidoCelular: { flex: 1, padding: 20, justifyContent: 'center', width: '100%', height: '100%' },
  
  tituloPrincipal: { color: '#ffffff', fontSize: 22, fontWeight: 'bold', marginBottom: 4, textAlign: 'center' },
  subtituloMenu: { color: '#4da6ff', fontSize: 13, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  titulo: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  tarjeta: { backgroundColor: '#131926', padding: 16, borderRadius: 14, width: '100%' },
  tarjetaCentrada: { backgroundColor: '#252942', padding: 16, borderRadius: 16, width: '100%', alignItems: 'center' },
  botonMenu: { backgroundColor: '#1f2638', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8, marginVertical: 6, borderWidth: 1, borderColor: '#2d3748', width: '100%' },
  textoBoton: { color: '#ffffff', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  subtituloSeccion: { color: '#ffffff', fontSize: 14, fontWeight: '600', marginBottom: 15, textAlign: 'center' },
  filaDato: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: '#232d42' },
  etiqueta: { color: '#7e8fa9', fontSize: 13 },
  valor: { color: '#4da6ff', fontSize: 13, fontWeight: 'bold' },
  botonVolver: { marginTop: 15, backgroundColor: '#1a202c', paddingVertical: 10, borderRadius: 6, borderWidth: 1, borderColor: '#4da6ff', width: '100%' },
  badgeNativo: { backgroundColor: '#3b82f6', color: '#ffffff', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 4, fontSize: 12, fontWeight: 'bold', marginBottom: 12 },
  cajaDesarrollador: { width: '100%', backgroundColor: '#181b30', padding: 10, borderRadius: 8, marginBottom: 12, alignItems: 'center' },
  textoDesarrollador: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' },
  subtextoApi: { color: '#a0aec0', fontSize: 11, marginTop: 1 },
  input: { width: '100%', backgroundColor: '#0f1123', color: '#ffffff', padding: 10, borderRadius: 6, marginBottom: 10, borderWidth: 1, borderColor: '#3a3f62', fontSize: 13 },
  
  // Estilos del Botón e Interacción de Categorías
  botonOutline: { width: '100%', paddingVertical: 10, borderRadius: 6, borderWidth: 1, borderColor: '#7c3aed', marginBottom: 10, alignItems: 'center' },
  botonOutlineActivo: { backgroundColor: '#7c3aed' },
  textoBotonOutline: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  contenedorCategoriasLive: { width: '100%', backgroundColor: '#151729', padding: 10, borderRadius: 6, marginBottom: 10, borderWidth: 1, borderColor: '#7c3aed' },
  itemCategoria: { color: '#e2e8f0', fontSize: 12, marginVertical: 3, paddingLeft: 5 },

  botonCyan: { width: '100%', backgroundColor: '#00f0ff', paddingVertical: 12, borderRadius: 6, marginBottom: 12, alignItems: 'center' },
  textoBotonNegro: { color: '#000000', fontSize: 13, fontWeight: 'bold' },
  filaBotones: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 2 },
  botonCuadrado: { flex: 0.48, backgroundColor: '#4a4f73', paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  textoBotonChico: { color: '#ffffff', fontSize: 12, fontWeight: '600' },
  seccionPixeles: { alignItems: 'center', marginVertical: 8 },
  textoPixelLabel: { color: '#a0aec0', fontSize: 14, marginBottom: 6 },
  resaltado: { color: '#4da6ff', fontWeight: 'bold' },
  bloqueColor: { borderRadius: 4 },
  botonVerde: { backgroundColor: '#10b981', paddingVertical: 12, borderRadius: 6, marginBottom: 12, alignItems: 'center', width: '100%' },
  botonAzul: { backgroundColor: '#3b82f6', paddingVertical: 12, borderRadius: 6, alignItems: 'center', width: '100%' }
});



 
