import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  Keyboard,
  Modal,
  PixelRatio,
  Platform,
  Pressable,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// ==========================================
// 📏 MÓDULO 1: DIMENSIONS & LAYOUT
// ==========================================
const DimensionsModule = () => {
  const { width, height, scale, fontScale } = useWindowDimensions();
  return (
    <View style={styles.moduleWrapper}>
      <Text style={styles.moduleSubTitle}>Dimensiones de Pantalla Activa</Text>
      <View style={styles.tagRow}>
        <Text style={styles.tagKey}>Ancho:</Text>
        <Text style={styles.tagVal}>{width.toFixed(1)} dp</Text>
      </View>
      <View style={styles.tagRow}>
        <Text style={styles.tagKey}>Alto:</Text>
        <Text style={styles.tagVal}>{height.toFixed(1)} dp</Text>
      </View>
      <View style={styles.tagRow}>
        <Text style={styles.tagKey}>Escala Física:</Text>
        <Text style={styles.tagVal}>x{scale}</Text>
      </View>
      <View style={styles.tagRow}>
        <Text style={styles.tagKey}>Escala Fuente:</Text>
        <Text style={styles.tagVal}>x{fontScale}</Text>
      </View>
      <View
        style={[
          styles.miniScreen,
          { aspectRatio: width / height, marginTop: 15 },
        ]}
      />
    </View>
  );
};

// ==========================================
// ⌨️ MÓDULO 2: INTERFAZ NATIVA (Código de Sara)
// ==========================================
const NativeApisModule = () => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [cargando, setCargando] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const datosSeccionados = [
    {
      title: "⚡ Lenguajes Frontend",
      data: ["JavaScript", "TypeScript", "React Native"],
    },
    { title: "🛠️ Lenguajes Backend", data: ["Python", "Node.js", "Java"] },
  ];

  useEffect(() => {
    const backAction = () => {
      if (modalVisible) {
        setModalVisible(false);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [modalVisible]);

  const manejarEnvio = () => {
    if (!nombre || !edad) {
      Alert.alert(
        "Campos vacíos",
        "Por favor completa los campos para continuar.",
      );
    } else {
      setCargando(true);
      setTimeout(() => {
        setCargando(false);
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravity(
            "¡Registro exitoso! 🚀",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          Alert.alert("Éxito", "¡Registro exitoso! 🚀");
        }
      }, 1500);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.saraContainer}>
        <Text style={styles.saraTitulo}>
          INTERFAZ <Text style={{ color: "#fff" }}>NATIVO</Text>
        </Text>

        <View style={styles.cardInfo}>
          <Text style={styles.textoInfo}>👤 Dev: SARA</Text>
          <Text style={styles.textoSub}>Componentes UI & API Nativa</Text>
        </View>

        {cargando && (
          <ActivityIndicator
            size="large"
            color="#00f2fe"
            style={{ marginBottom: 15 }}
          />
        )}

        <View style={{ marginBottom: 5, width: "100%" }}>
          <TextInput
            style={styles.saraInput}
            placeholder="Tu nombre"
            placeholderTextColor="#666"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.saraInput}
            placeholder="Tu edad"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={edad}
            onChangeText={setEdad}
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.botonSecundario,
            {
              backgroundColor: pressed ? "#1f1f35" : "transparent",
              width: "100%",
            },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textoBotonSec}>VER CATEGORÍAS</Text>
        </Pressable>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.inlineButton,
            { backgroundColor: "#00f2fe", width: "100%" },
          ]}
          onPress={manejarEnvio}
        >
          <Text style={[styles.btnText, { color: "#0a0a1a" }]}>
            ENVIAR AHORA
          </Text>
        </TouchableOpacity>

        <View style={styles.rowImages}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: "reactnative.dev" }} style={styles.logoImg} />
          </View>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: "svgcdn.com" }} style={styles.logoImg} />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalCentrado}>
            <View style={styles.modalContenido}>
              <View style={styles.modalHeaderBar} />
              <Text style={styles.tituloModal}>Categorías</Text>
              <SectionList
                sections={datosSeccionados}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text style={styles.itemLista}>• {item}</Text>
                  </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.headerSeccion}>{title}</Text>
                )}
                stickySectionHeadersEnabled={false}
              />
              <TouchableOpacity
                style={[
                  styles.inlineButton,
                  { marginTop: 20, width: "100%", backgroundColor: "#ff0055" },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnText}>CERRAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

// ==========================================
// 🖼️ MÓDULO 3: PIXELRATIO & IMAGES
// ==========================================
const PixelRatioModule = () => {
  const baseSize = 40;
  const pSize = PixelRatio.getPixelSizeForLayoutSize(baseSize);
  return (
    <View style={styles.moduleWrapper}>
      <Text style={styles.moduleSubTitle}>Render Real vs Físico</Text>
      <Text style={styles.infoLabel}>Tamaño Layout ({baseSize}dp):</Text>
      <Image
        source={{ uri: "reactnative.dev" }}
        style={{ width: baseSize, height: baseSize, marginVertical: 8 }}
      />
      <Text style={styles.infoLabel}>Tamaño Nativo ({pSize}px):</Text>
      <Image
        source={{ uri: "reactnative.dev" }}
        style={{ width: pSize, height: pSize, marginVertical: 8 }}
      />
    </View>
  );
};

// ==========================================
// 🔋 MÓDULO 4: STATUSBAR CONTROLLER
// ==========================================
const StatusBarModule = () => {
  const [hidden, setHidden] = useState(false);
  const [style, setStyle] = useState("light-content");
  return (
    <View style={styles.moduleWrapper}>
      <StatusBar barStyle={style} hidden={hidden} animated />
      <Text style={styles.moduleSubTitle}>Controlador Live</Text>
      <TouchableOpacity
        style={[styles.inlineButton, { backgroundColor: "#10b981" }]}
        onPress={() => setHidden(!hidden)}
      >
        <Text style={styles.btnText}>
          {hidden ? "Mostrar Barra" : "Ocultar Barra"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.inlineButton,
          { backgroundColor: "#3b82f6", marginTop: 10 },
        ]}
        onPress={() =>
          setStyle(style === "light-content" ? "dark-content" : "light-content")
        }
      >
        <Text style={styles.btnText}>Alternar Estilo</Text>
      </TouchableOpacity>
    </View>
  );
};

// ==========================================
// 🛠️ COMPONENTE PRINCIPAL (GITHUB REPO)
// ==========================================
const AppRepository = () => {
  const [activeComponentId, setActiveComponentId] = useState(null);

  const components = [
    {
      id: "1",
      title: "Dimensiones y distribución",
      icon: "📏",
      desc: "Manejo de pantallas y orientación",
    },
    {
      id: "2",
      title: "Interfaces nativas y APIs",
      icon: "⌨️",
      desc: "Formularios, modales y BackHandler (Sara)",
    },
    {
      id: "3",
      title: "Proporción de píxeles e imágenes",
      icon: "🖼️",
      desc: "Densidad de píxeles y calidad",
    },
    {
      id: "4",
      title: "Controlador StatusBar",
      icon: "🔋",
      desc: "Control dinámico de la barra",
    },
  ];

  if (activeComponentId) {
    const selected = components.find((c) => c.id === activeComponentId);
    return (
      <SafeAreaProvider>
        <View style={styles.mainContainer}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 20, flex: 1, paddingTop: 15 }}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setActiveComponentId(null)}
              >
                <Text style={styles.backText}>← Volver al Repo</Text>
              </TouchableOpacity>
              <Text style={styles.detailTitle}>{selected.title}</Text>

              <View style={styles.demoArea}>
                {activeComponentId === "1" && <DimensionsModule />}
                {activeComponentId === "2" && <NativeApisModule />}
                {activeComponentId === "3" && <PixelRatioModule />}
                {activeComponentId === "4" && <StatusBarModule />}
              </View>
            </View>
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.repoHeader}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.repoUser}>
                sara-dev /{" "}
                <Text style={styles.repoName}>RN-Native-Features</Text>
              </Text>
              <Text style={styles.repoStatus}>Public Repository</Text>
            </View>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Componentes Investigados</Text>

            {components.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.componentCard}
                onPress={() => setActiveComponentId(item.id)}
              >
                <Text style={styles.componentIcon}>{item.icon}</Text>
                <View style={styles.componentInfo}>
                  <Text style={styles.componentTitle}>{item.title}</Text>
                  <Text style={styles.componentDesc}>{item.desc}</Text>
                </View>
                <Text style={styles.arrow}>❯</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.readme}>
              <Text style={styles.readmeTitle}>README.md</Text>
              <Text style={styles.readmeText}>
                Este repositorio unifica las pruebas nativas de arquitectura
                móvil de React Native, incluyendo el contenedor avanzado
                diseñado por Sara.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

// ==========================================
// 🎨 HOJA DE ESTILOS UNIFICADA
// ==========================================
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#0d1117",
    maxWidth: Platform.OS === "web" ? 500 : "100%",
    width: "100%",
    alignSelf: "center",
  },
  repoHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#161b22",
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: "#00f2fe",
    borderRadius: 20,
    marginRight: 12,
  },
  repoUser: { color: "#8b949e", fontSize: 16 },
  repoName: { color: "#58a6ff", fontWeight: "bold" },
  repoStatus: { color: "#8b949e", fontSize: 12 },
  content: { padding: 16 },
  sectionTitle: {
    color: "#f0f6fc",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  componentCard: {
    backgroundColor: "#161b22",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  componentIcon: { fontSize: 24, marginRight: 16 },
  componentInfo: { flex: 1 },
  componentTitle: { color: "#58a6ff", fontSize: 16, fontWeight: "bold" },
  componentDesc: { color: "#8b949e", fontSize: 13, marginTop: 2 },
  arrow: { color: "#30363d", fontSize: 18 },
  readme: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#161b22",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  readmeTitle: {
    color: "#f0f6fc",
    fontWeight: "bold",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
    paddingBottom: 8,
  },
  readmeText: { color: "#8b949e", lineHeight: 20 },

  backButton: { marginVertical: 15 },
  backText: { color: "#58a6ff", fontSize: 16 },
  detailTitle: {
    color: "#f0f6fc",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  demoArea: {
    flex: 1,
    backgroundColor: "#161b22",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#30363d",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  moduleWrapper: { width: "100%", alignItems: "center" },
  moduleSubTitle: {
    color: "#f0f6fc",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  tagRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#21262d",
  },
  tagKey: { color: "#8b949e", fontSize: 14 },
  tagVal: { color: "#58a6ff", fontSize: 14, fontWeight: "600" },
  miniScreen: {
    width: 50,
    borderWidth: 2,
    borderColor: "#58a6ff",
    borderRadius: 6,
    backgroundColor: "rgba(88, 166, 255, 0.1)",
  },
  inlineButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#58a6ff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { color: "#ffffff", fontWeight: "800", fontSize: 15 },
  infoLabel: {
    color: "#8b949e",
    fontSize: 12,
    marginTop: 10,
    alignSelf: "flex-start",
  },

  saraContainer: {
    width: "100%",
    backgroundColor: "#50507c",
    padding: 15,
    borderRadius: 25,
  },
  saraTitulo: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
    color: "#00f2fe",
    letterSpacing: 1,
  },
  cardInfo: {
    backgroundColor: "#1a1a30",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#00f2fe",
  },
  textoInfo: { fontSize: 14, fontWeight: "bold", color: "#fff" },
  textoSub: { fontSize: 11, color: "#4facfe", marginTop: 2 },
  saraInput: {
    backgroundColor: "#050510",
    color: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#222",
  },
  botonSecundario: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#00f2fe",
    marginBottom: 12,
    alignItems: "center",
  },
  textoBotonSec: { color: "#00f2fe", fontSize: 13, fontWeight: "bold" },
  rowImages: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    gap: 15,
  },
  imageWrapper: {
    width: 65,
    height: 65,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7575be",
  },
  logoImg: { width: 50, height: 50, resizeMode: "contain" },
  modalCentrado: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalContenido: {
    backgroundColor: "#05050a",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: "75%",
    borderWidth: 1,
    borderColor: "#1e1e2e",
  },
  modalHeaderBar: {
    width: 50,
    height: 5,
    backgroundColor: "#333",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
  },
  tituloModal: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  headerSeccion: {
    color: "#00f2fe",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  itemContainer: { paddingVertical: 6 },
  itemLista: { color: "white", fontSize: 15 },
});

export default AppRepository;
