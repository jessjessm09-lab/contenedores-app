const { useState, useEffect } = React;

// ===== CONFIGURACIÓN DE SUPABASE =====
const supabaseUrl = 'https://bpsadxnheljilmxocvnh.supabase.co';
const supabaseKey = 'sb_publishable_VAHKPqC5oHjxRh_iGaYQzg_b-12AHXQ';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// ===== ICONOS SVG =====
const Truck = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
    <circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>
  </svg>
);

const UserCog = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4"/><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
  </svg>
);

const Download = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const Save = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
  </svg>
);

const Trash2 = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const ArrowRight = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const Settings = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/><path d="m1 12 6 0m6 0 6 0"/>
  </svg>
);

const Plus = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const Lock = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const LogOut = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

// ===== COMPONENTE PRINCIPAL =====
const SistemaContenedores = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modo, setModo] = useState('chofer');
  const [registros, setRegistros] = useState([]);
  const [choferActual, setChoferActual] = useState('');
  const [sectorSeleccionado, setSectorSeleccionado] = useState('');
  const [lugarSeleccionado, setLugarSeleccionado] = useState('');
  const [numContenedor, setNumContenedor] = useState('');
  const [internoSeleccionado, setInternoSeleccionado] = useState('');
  const [internoRetiroSeleccionado, setInternoRetiroSeleccionado] = useState(''); // NUEVO
  const [kilos, setKilos] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [filtroMes, setFiltroMes] = useState('');
  const [mostrarConfig, setMostrarConfig] = useState(false);
  const [fechaEntregaManual, setFechaEntregaManual] = useState('');
  const [horaEntregaManual, setHoraEntregaManual] = useState('');
  const [fechaRetiroManual, setFechaRetiroManual] = useState('');
  const [horaRetiroManual, setHoraRetiroManual] = useState('');
  
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('chofer');
  
  const [choferes, setChoferes] = useState(['SANDANDER', 'ROBLES MIGUEL']);
  const [internos, setInternos] = useState([]);
  const [sectoresLugares, setSectoresLugares] = useState({
    'TAFI VIEJO': [
      'AV. MANUEL RAYA Y CABO QUIPILDOR (PUNTO VERDE LOMAS DE TAFI)',
      'JOSE COLOMBRE Y LAPRIDA',
      'PLANTA DE CLASIFICACION (CIAT) (CINTA)',
      'PLANTA DE CLASIFICACION (CIAT) (2)',
      'PLANTA DE CLASIFICACION (CIAT) (3)',
      'AV. VIRGEN GENERALA Y CAMPAÑA DEL DESIERTO (LOS POCITOS COMISARIA)'
    ],
    'YERBA BUENA': ['LAS HIGUERITAS Y FRANCISCO DE ASIS'],
    'SMT': ['HIGIENE URBANA (S12)']
  });
  
  const [nuevoChofer, setNuevoChofer] = useState('');
  const [nuevoSector, setNuevoSector] = useState('');
  const [nuevoLugar, setNuevoLugar] = useState('');
  const [sectorParaLugar, setSectorParaLugar] = useState('');
  const [nuevoInterno, setNuevoInterno] = useState('');
  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
    });
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user && userProfile) {
      cargarDatos();
      cargarInternos();
    }
  }, [user, userProfile]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
    if (session?.user) {
      await loadUserProfile(session.user.id);
    }
    setLoading(false);
  };

  const loadUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data) {
      setUserProfile(data);
      setChoferActual(data.nombre);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !nombre) {
      mostrarMensaje('Por favor complete todos los campos', 'error');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre, rol }
      }
    });

    if (error) {
      mostrarMensaje('Error: ' + error.message, 'error');
      return;
    }

    const { error: profileError } = await supabase
      .from('usuarios')
      .insert([{ id: data.user.id, email, nombre, rol }]);

    if (profileError) {
      mostrarMensaje('Error al crear perfil', 'error');
      return;
    }

    mostrarMensaje('Cuenta creada exitosamente', 'exito');
    setEmail('');
    setPassword('');
    setNombre('');
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      mostrarMensaje('Error: ' + error.message, 'error');
      return;
    }

    mostrarMensaje('Bienvenido', 'exito');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setRegistros([]);
  };

  const cargarDatos = async () => {
    let query = supabase.from('registros').select('*');
    
    if (userProfile?.rol === 'chofer') {
      query = query.eq('user_id', user.id);
    }
    
    const { data, error } = await query.order('fecha_entrega', { ascending: false });
    
    if (data) {
      setRegistros(data);
    }
  };

  const cargarInternos = async () => {
    const { data, error } = await supabase
      .from('internos')
      .select('*')
      .order('numero', { ascending: true });
    
    if (data) {
      setInternos(data.map(i => i.numero));
    }
  };

  const registrarEntrega = async () => {
    if (!choferActual || !sectorSeleccionado || !lugarSeleccionado || !numContenedor || !internoSeleccionado) {
      mostrarMensaje('Por favor complete todos los campos incluyendo el interno', 'error');
      return;
    }

    let fechaEntrega;
    if (fechaEntregaManual && horaEntregaManual) {
      fechaEntrega = new Date(`${fechaEntregaManual}T${horaEntregaManual}`);
    } else {
      fechaEntrega = new Date();
    }

    const nuevoRegistro = {
      user_id: user.id,
      chofer: choferActual,
      sector: sectorSeleccionado,
      lugar: lugarSeleccionado,
      contenedor: numContenedor,
      interno: internoSeleccionado,
      fecha_entrega: fechaEntrega.toISOString(),
      estado: 'PENDIENTE_RETIRO',
      kilos: null,
      fecha_retiro: null,
      chofer_retiro: null,
      interno_retiro: null, // NUEVO CAMPO
      dias: null
    };

    const { error } = await supabase
      .from('registros')
      .insert([nuevoRegistro]);

    if (error) {
      mostrarMensaje('Error al registrar entrega: ' + error.message, 'error');
      return;
    }

    await cargarDatos();
    setNumContenedor('');
    setInternoSeleccionado('');
    setFechaEntregaManual('');
    setHoraEntregaManual('');
    mostrarMensaje('✓ Entrega registrada correctamente', 'exito');
  };

  // FUNCIÓN MODIFICADA - Ya no busca por interno
  const registrarRetiro = async () => {
    if (!choferActual || !sectorSeleccionado || !lugarSeleccionado || !numContenedor || !kilos || !internoRetiroSeleccionado) {
      mostrarMensaje('Por favor complete todos los campos incluyendo el interno de retiro y los kilos', 'error');
      return;
    }

    // CAMBIO IMPORTANTE: Ya no filtra por interno, solo por contenedor, sector y lugar
    const entrega = registros.find(
      r => r.contenedor === numContenedor && 
           r.sector === sectorSeleccionado && 
           r.lugar === lugarSeleccionado && 
           r.estado === 'PENDIENTE_RETIRO'
    );

    if (!entrega) {
      mostrarMensaje('No se encontró una entrega pendiente para este contenedor en este sector', 'error');
      return;
    }

    let fechaRetiro;
    if (fechaRetiroManual && horaRetiroManual) {
      fechaRetiro = new Date(`${fechaRetiroManual}T${horaRetiroManual}`);
    } else {
      fechaRetiro = new Date();
    }
    
    const fechaEntrega = new Date(entrega.fecha_entrega);
    const dias = Math.floor((fechaRetiro - fechaEntrega) / (1000 * 60 * 60 * 24));

    const { error } = await supabase
      .from('registros')
      .update({
        estado: 'COMPLETADO',
        chofer_retiro: choferActual,
        fecha_retiro: fechaRetiro.toISOString(),
        kilos: parseFloat(kilos),
        interno_retiro: internoRetiroSeleccionado, // NUEVO CAMPO
        dias: dias
      })
      .eq('id', entrega.id);

    if (error) {
      mostrarMensaje('Error al registrar retiro: ' + error.message, 'error');
      return;
    }

    await cargarDatos();
    setNumContenedor('');
    setKilos('');
    setInternoRetiroSeleccionado('');
    setFechaRetiroManual('');
    setHoraRetiroManual('');
    mostrarMensaje('✓ Retiro registrado correctamente con ' + kilos + ' kg', 'exito');
  };

  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(''), 3000);
  };

  const eliminarRegistro = async (id) => {
    if (!confirm('¿Está seguro de eliminar este registro?')) return;

    const { error } = await supabase
      .from('registros')
      .delete()
      .eq('id', id);

    if (error) {
      mostrarMensaje('Error al eliminar: ' + error.message, 'error');
      return;
    }

    await cargarDatos();
    mostrarMensaje('Registro eliminado', 'exito');
  };
  const agregarChofer = () => {
    if (nuevoChofer.trim()) {
      const nuevosChoferes = [...choferes, nuevoChofer.trim().toUpperCase()];
      setChoferes(nuevosChoferes);
      localStorage.setItem('choferes', JSON.stringify(nuevosChoferes));
      setNuevoChofer('');
      mostrarMensaje('Chofer agregado correctamente', 'exito');
    }
  };

  const eliminarChofer = (chofer) => {
    if (confirm(`¿Está seguro de eliminar al chofer ${chofer}?`)) {
      const nuevosChoferes = choferes.filter(c => c !== chofer);
      setChoferes(nuevosChoferes);
      localStorage.setItem('choferes', JSON.stringify(nuevosChoferes));
      mostrarMensaje('Chofer eliminado', 'exito');
    }
  };

  const agregarInterno = async () => {
    if (!nuevoInterno.trim()) return;

    const { error } = await supabase
      .from('internos')
      .insert([{ numero: nuevoInterno.trim() }]);

    if (error) {
      mostrarMensaje('Error al agregar interno: ' + error.message, 'error');
      return;
    }

    await cargarInternos();
    setNuevoInterno('');
    mostrarMensaje('Interno agregado correctamente', 'exito');
  };

  const eliminarInterno = async (numero) => {
    if (!confirm(`¿Está seguro de eliminar el interno ${numero}?`)) return;

    const { error } = await supabase
      .from('internos')
      .delete()
      .eq('numero', numero);

    if (error) {
      mostrarMensaje('Error al eliminar interno: ' + error.message, 'error');
      return;
    }

    await cargarInternos();
    mostrarMensaje('Interno eliminado', 'exito');
  };

  const agregarSector = () => {
    if (nuevoSector.trim()) {
      const nuevosSectores = { ...sectoresLugares, [nuevoSector.trim().toUpperCase()]: [] };
      setSectoresLugares(nuevosSectores);
      localStorage.setItem('sectoresLugares', JSON.stringify(nuevosSectores));
      setNuevoSector('');
      mostrarMensaje('Municipio agregado correctamente', 'exito');
    }
  };

  const eliminarSector = (sector) => {
    if (confirm(`¿Está seguro de eliminar el municipio ${sector}?`)) {
      const nuevosSectores = { ...sectoresLugares };
      delete nuevosSectores[sector];
      setSectoresLugares(nuevosSectores);
      localStorage.setItem('sectoresLugares', JSON.stringify(nuevosSectores));
      mostrarMensaje('Municipio eliminado', 'exito');
    }
  };

  const agregarLugar = () => {
    if (sectorParaLugar && nuevoLugar.trim()) {
      const nuevosSectores = { ...sectoresLugares };
      nuevosSectores[sectorParaLugar] = [...nuevosSectores[sectorParaLugar], nuevoLugar.trim().toUpperCase()];
      setSectoresLugares(nuevosSectores);
      localStorage.setItem('sectoresLugares', JSON.stringify(nuevosSectores));
      setNuevoLugar('');
      mostrarMensaje('Sector agregado correctamente', 'exito');
    }
  };

  const eliminarLugar = (sector, lugar) => {
    if (confirm(`¿Está seguro de eliminar el sector ${lugar}?`)) {
      const nuevosSectores = { ...sectoresLugares };
      nuevosSectores[sector] = nuevosSectores[sector].filter(l => l !== lugar);
      setSectoresLugares(nuevosSectores);
      localStorage.setItem('sectoresLugares', JSON.stringify(nuevosSectores));
      mostrarMensaje('Sector eliminado', 'exito');
    }
  };

const exportarExcel = () => {
  // CAMBIO: Incluir TODOS los registros, no solo completados
  let datosExportar = registros; // Ya vienen ordenados por fecha_entrega desc
  
  if (datosExportar.length === 0) {
    mostrarMensaje('No hay registros para exportar', 'error');
    return;
  }
    
    if (filtroMes) {
      datosExportar = datosExportar.filter(r => {
        const fechaRegistro = new Date(r.fecha_entrega);
        const [year, month] = filtroMes.split('-');
        return fechaRegistro.getFullYear() === parseInt(year) && 
               fechaRegistro.getMonth() === parseInt(month) - 1;
      });
    }

    if (datosExportar.length === 0) {
      mostrarMensaje('No hay datos para el mes seleccionado', 'error');
      return;
    }

    let htmlContent = `
      <html xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
          <meta charset="UTF-8">
          <style>
            table { border-collapse: collapse; width: 100%; }
            th { background-color: #4472C4; color: white; font-weight: bold; border: 1px solid #000; padding: 8px; text-align: center; }
            td { border: 1px solid #000; padding: 6px; text-align: left; }
            .numero { text-align: center; }
            .total { background-color: #E7E6E6; font-weight: bold; }
            .sector-header { background-color: #FFC000; font-weight: bold; }
            .pendiente { background-color: #FFF9C4; }
          </style>
        </head>
        <body>
          <h2>SERVICIO DE CONTENEDORES ROLL-OFF PLANILLA GENERAL ${filtroMes ? new Date(filtroMes + '-01').toLocaleString('es-AR', { month: 'long', year: 'numeric' }).toUpperCase() : 'TODOS'}</h2>
          <table>
            <thead>
              <tr>
                <th colspan="3">RETIRO Y ENTREGA</th>
                <th colspan="6">ENTREGA</th>
                <th colspan="6">RETIRO</th>
                <th colspan="1">KGS.</th>
                <th colspan="1">DIAS</th>
              </tr>
              <tr>
                <th>MUNICIPIO</th>
                <th>SECTOR</th>
                <th>CONT</th>
                <th>Empr.</th>
                <th>CHOFER</th>
                <th>INT.</th>
                <th>FECHA</th>
                <th>HORA</th>
                <th>INT.</th>
                <th>CHOFER</th>
                <th>FECHA</th>
                <th>HORA</th>
                <th>KGS.</th>
                <th>DIAS</th>
              </tr>
            </thead>
            <tbody>
    `;

    datosExportar.forEach(r => {
      const fechaEntrega = new Date(r.fecha_entrega);
      const internoRetiro = r.interno_retiro || r.interno || '1';
      
      // Si está completado, mostramos todos los datos
      if (r.estado === 'COMPLETADO') {
        const fechaRetiro = new Date(r.fecha_retiro);
        htmlContent += `
          <tr>
            <td>${r.sector}</td>
            <td>${r.lugar}</td>
            <td class="numero">${r.contenedor}</td>
            <td>GIRSU</td>
            <td>${r.chofer}</td>
            <td class="numero">${r.interno || '1'}</td>
            <td class="numero">${fechaEntrega.toLocaleDateString('es-AR')}</td>
            <td class="numero">${fechaEntrega.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</td>
            <td class="numero">${internoRetiro}</td>
            <td>${r.chofer_retiro}</td>
            <td class="numero">${fechaRetiro.toLocaleDateString('es-AR')}</td>
            <td class="numero">${fechaRetiro.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</td>
            <td class="numero">${r.kilos}</td>
            <td class="numero">${r.dias}</td>
          </tr>
        `;
      } else {
        // Si está pendiente, mostramos solo los datos de entrega
        htmlContent += `
          <tr class="pendiente">
            <td>${r.sector}</td>
            <td>${r.lugar}</td>
            <td class="numero">${r.contenedor}</td>
            <td>GIRSU</td>
            <td>${r.chofer}</td>
            <td class="numero">${r.interno || '1'}</td>
            <td class="numero">${fechaEntrega.toLocaleDateString('es-AR')}</td>
            <td class="numero">${fechaEntrega.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</td>
            <td class="numero"></td>
            <td></td>
            <td class="numero"></td>
            <td class="numero"></td>
            <td class="numero"></td>
            <td class="numero"></td>
          </tr>
        `;
      }
    });

    // Calcular totales solo con los completados
    const registrosCompletos = datosExportar.filter(r => r.estado === 'COMPLETADO');
    const totalKilos = registrosCompletos.reduce((sum, r) => sum + r.kilos, 0);
    const totalViajes = registrosCompletos.length;
    const totalViajesDobles = totalViajes * 2;

    htmlContent += `
            </tbody>
            <tfoot>
              <tr class="total">
                <td colspan="12" style="text-align: right;">TOTAL VIAJES</td>
                <td class="numero">${totalViajesDobles}</td>
                <td colspan="1" style="text-align: center;">TOTAL KG.</td>
              </tr>
              <tr class="total">
                <td colspan="12"></td>
                <td></td>
                <td class="numero">${totalKilos.toLocaleString('es-AR')}</td>
              </tr>
    `;

    const porSector = {};
    registrosCompletos.forEach(r => {
      if (!porSector[r.sector]) {
        porSector[r.sector] = { viajes: 0, kilos: 0 };
      }
      porSector[r.sector].viajes++;
      porSector[r.sector].kilos += r.kilos;
    });

    Object.keys(porSector).forEach(sector => {
      htmlContent += `
        <tr class="sector-header">
          <td colspan="6">${sector}</td>
          <td colspan="2">VIAJES ENTREGADOS</td>
          <td class="numero">${porSector[sector].viajes}</td>
          <td colspan="2">VIAJES RETIRADOS</td>
          <td class="numero">${porSector[sector].viajes}</td>
          <td colspan="1">TOTAL KG.</td>
          <td class="numero">${porSector[sector].kilos.toLocaleString('es-AR')}</td>
        </tr>
      `;
    });

    htmlContent += `
            </tfoot>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contenedores_${filtroMes || 'todos'}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    mostrarMensaje('Excel descargado correctamente', 'exito');
  };
  const calcularTotales = () => {
    let datosFiltrados = registros.filter(r => r.estado === 'COMPLETADO');
    
    if (filtroMes) {
      datosFiltrados = datosFiltrados.filter(r => {
        const fechaRegistro = new Date(r.fecha_entrega);
        const [year, month] = filtroMes.split('-');
        return fechaRegistro.getFullYear() === parseInt(year) && 
               fechaRegistro.getMonth() === parseInt(month) - 1;
      });
    }

    const totalKilos = datosFiltrados.reduce((sum, r) => sum + r.kilos, 0);
    const totalViajes = datosFiltrados.length;
    const pendientes = registros.filter(r => r.estado === 'PENDIENTE_RETIRO').length;
    
    return { totalKilos, totalViajes, pendientes, datosFiltrados };
  };

  const { totalKilos, totalViajes, pendientes } = calcularTotales();
  const lugaresPorSector = sectorSeleccionado ? sectoresLugares[sectorSeleccionado] : [];
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-xl font-bold text-gray-700">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Sistema de Contenedores
          </h1>
          
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setShowLogin(true)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                showLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                !showLogin ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Registrarse
            </button>
          </div>

          <div className="space-y-4">
            {!showLogin && (
              <>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Rol</label>
                  <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="chofer">Chofer</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </>
            )}
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={showLogin ? handleSignIn : handleSignUp}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              {showLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </div>

          {mensaje && (
            <div className={`mt-4 p-3 rounded-lg ${
              mensaje.tipo === 'exito' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {mensaje.texto}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Sistema de Contenedores Roll-Off - Tucumán
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Usuario: {userProfile?.nombre} ({userProfile?.rol})
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} />
              Salir
            </button>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => setModo('chofer')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                modo === 'chofer'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Truck size={20} />
              Modo Chofer
            </button>
            {userProfile?.rol === 'admin' && (
              <button
                onClick={() => setModo('admin')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  modo === 'admin'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <UserCog size={20} />
                Administrador
              </button>
            )}
          </div>
        </div>

        {mensaje && (
          <div className={`mb-6 p-4 rounded-lg shadow-lg ${
            mensaje.tipo === 'exito' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {mensaje.texto}
          </div>
        )}
{modo === 'chofer' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Registrar Viaje</h2>
              
              <div className="space-y-4">
                {userProfile?.rol === 'admin' ? (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Nombre del Chofer
                    </label>
                    <select
                      value={choferActual}
                      onChange={(e) => setChoferActual(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccione un chofer</option>
                      {choferes.map((chofer, idx) => (
                        <option key={idx} value={chofer}>{chofer}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Chofer
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg">
                      {choferActual}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Municipio
                  </label>
                  <select
                    value={sectorSeleccionado}
                    onChange={(e) => {
                      setSectorSeleccionado(e.target.value);
                      setLugarSeleccionado('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione un municipio</option>
                    {Object.keys(sectoresLugares).map((sector) => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                {sectorSeleccionado && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Sector
                    </label>
                    <select
                      value={lugarSeleccionado}
                      onChange={(e) => setLugarSeleccionado(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccione un sector</option>
                      {lugaresPorSector.map((lugar, idx) => (
                        <option key={idx} value={lugar}>{lugar}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Número de Contenedor
                  </label>
                  <input
                    type="text"
                    value={numContenedor}
                    onChange={(e) => setNumContenedor(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: 18, 23, etc."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Interno para ENTREGA
                  </label>
                  <select
                    value={internoSeleccionado}
                    onChange={(e) => setInternoSeleccionado(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione un interno</option>
                    {internos.map((interno, idx) => (
                      <option key={idx} value={interno}>{interno}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Fecha y Hora de Entrega (Opcional)</p>
                  <p className="text-xs text-gray-600 mb-2">Si no selecciona, se usará la fecha y hora actual</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Fecha</label>
                      <input
                        type="date"
                        value={fechaEntregaManual}
                        onChange={(e) => setFechaEntregaManual(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Hora</label>
                      <input
                        type="time"
                        value={horaEntregaManual}
                        onChange={(e) => setHoraEntregaManual(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={registrarEntrega}
                className="bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save size={24} />
                Registrar ENTREGA
              </button>

              <div className="bg-white rounded-lg shadow-lg p-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Kilos (solo para RETIRO)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={kilos}
                  onChange={(e) => setKilos(e.target.value)}
                  className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ingrese los kilos"
                />
                
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Interno para RETIRO
                </label>
                <select
                  value={internoRetiroSeleccionado}
                  onChange={(e) => setInternoRetiroSeleccionado(e.target.value)}
                  className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Seleccione un interno</option>
                  {internos.map((interno, idx) => (
                    <option key={idx} value={interno}>{interno}</option>
                  ))}
                </select>
                
                <div className="bg-green-50 p-3 rounded-lg mb-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Fecha y Hora de Retiro (Opcional)</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="date"
                        value={fechaRetiroManual}
                        onChange={(e) => setFechaRetiroManual(e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <input
                        type="time"
                        value={horaRetiroManual}
                        onChange={(e) => setHoraRetiroManual(e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={registrarRetiro}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRight size={20} />
                  Registrar RETIRO
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contenedores Pendientes de Retiro</h3>
              <div className="space-y-2">
                {registros
                  .filter(r => r.estado === 'PENDIENTE_RETIRO')
                  .map(r => (
                    <div key={r.id} className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-800">{r.sector} - {r.lugar}</p>
                          <p className="text-sm text-gray-600">Contenedor #{r.contenedor} - Interno {r.interno}</p>
                          <p className="text-xs text-gray-500">Entregado: {new Date(r.fecha_entrega).toLocaleString('es-AR')} por {r.chofer}</p>
                        </div>
                        <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold">
                          PENDIENTE
                        </div>
                      </div>
                    </div>
                  ))}
                {registros.filter(r => r.estado === 'PENDIENTE_RETIRO').length === 0 && (
                  <p className="text-gray-500 text-center py-4">No hay contenedores pendientes de retiro</p>
                )}
              </div>
            </div>
          </div>
        )}
{modo === 'admin' && userProfile?.rol === 'admin' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Panel de Administración</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMostrarConfig(!mostrarConfig)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <Settings size={20} />
                    Configuración
                  </button>
                  <button
                    onClick={exportarExcel}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Download size={20} />
                    Descargar Excel
                  </button>
                </div>
              </div>

              {mostrarConfig && (
                <div className="mb-6 bg-gray-50 p-6 rounded-lg space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Configuración del Sistema</h3>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-bold text-gray-700 mb-3">Gestión de Choferes</h4>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={nuevoChofer}
                        onChange={(e) => setNuevoChofer(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre del nuevo chofer"
                      />
                      <button
                        onClick={agregarChofer}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2"
                      >
                        <Plus size={20} />
                        Agregar
                      </button>
                    </div>
                    <div className="space-y-2">
                      {choferes.map((chofer, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-medium text-gray-800">{chofer}</span>
                          <button
                            onClick={() => eliminarChofer(chofer)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <h4 className="font-bold text-gray-700 mb-3">Gestión de Internos</h4>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={nuevoInterno}
                        onChange={(e) => setNuevoInterno(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Número del nuevo interno (ej: 3, 4)"
                      />
                      <button
                        onClick={agregarInterno}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2"
                      >
                        <Plus size={20} />
                        Agregar
                      </button>
                    </div>
                    <div className="space-y-2">
                      {internos.map((interno, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-medium text-gray-800">Interno {interno}</span>
                          <button
                            onClick={() => eliminarInterno(interno)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <h4 className="font-bold text-gray-700 mb-3">Gestión de Municipios</h4>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={nuevoSector}
                        onChange={(e) => setNuevoSector(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre del nuevo municipio"
                      />
                      <button
                        onClick={agregarSector}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2"
                      >
                        <Plus size={20} />
                        Agregar
                      </button>
                    </div>
                    <div className="space-y-2">
                      {Object.keys(sectoresLugares).map((sector, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-gray-800">{sector}</span>
                            <button
                              onClick={() => eliminarSector(sector)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="ml-4 text-sm text-gray-600">
                            {sectoresLugares[sector].length} sectores configurados
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-700 mb-3">Gestión de Sectores por Municipio</h4>
                    <div className="space-y-3">
                      <select
                        value={sectorParaLugar}
                        onChange={(e) => setSectorParaLugar(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seleccione un municipio</option>
                        {Object.keys(sectoresLugares).map((sector) => (
                          <option key={sector} value={sector}>{sector}</option>
                        ))}
                      </select>
                      
                      {sectorParaLugar && (
                        <>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={nuevoLugar}
                              onChange={(e) => setNuevoLugar(e.target.value)}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              placeholder="Nombre del nuevo sector"
                            />
                            <button
                              onClick={agregarLugar}
                              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2"
                            >
                              <Plus size={20} />
                              Agregar
                            </button>
                          </div>
                          <div className="space-y-2">
                            {sectoresLugares[sectorParaLugar].map((lugar, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg">
                                <span className="text-gray-800">{lugar}</span>
                                <button
                                  onClick={() => eliminarLugar(sectorParaLugar, lugar)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Filtrar por mes
                </label>
                <input
                  type="month"
                  value={filtroMes}
                  onChange={(e) => setFiltroMes(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {filtroMes && (
                  <button
                    onClick={() => setFiltroMes('')}
                    className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Ver todos
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600 font-semibold">Viajes Completados</p>
                  <p className="text-3xl font-bold text-blue-600">{totalViajes}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-600 font-semibold">Total Kilos</p>
                  <p className="text-3xl font-bold text-green-600">
                    {totalKilos.toLocaleString('es-AR')} kg
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-600 font-semibold">Pendientes Retiro</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendientes}</p>
                </div>
              </div>
<div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">Municipio</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">Sector</th>
                      <th className="px-3 py-2 text-center font-semibold text-gray-700">Cont.</th>
                      <th className="px-3 py-2 text-center font-semibold text-gray-700">Int. Ent.</th>
                      <th className="px-3 py-2 text-center font-semibold text-gray-700">Int. Ret.</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">Entrega</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">Retiro</th>
                      <th className="px-3 py-2 text-right font-semibold text-gray-700">Kilos</th>
                      <th className="px-3 py-2 text-center font-semibold text-gray-700">Días</th>
                      <th className="px-3 py-2 text-center font-semibold text-gray-700">Estado</th>
                      <th className="px-3 py-2 text-center font-semibold text-gray-700">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registros.length === 0 ? (
                      <tr>
                        <td colSpan="11" className="px-3 py-8 text-center text-gray-500">
                          No hay registros para mostrar
                        </td>
                      </tr>
                    ) : (
                      registros.map(r => (
                        <tr key={r.id} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-3 font-medium text-gray-800">{r.sector}</td>
                          <td className="px-3 py-3 text-gray-700 text-xs">{r.lugar}</td>
                          <td className="px-3 py-3 text-center font-bold text-blue-600">{r.contenedor}</td>
                          <td className="px-3 py-3 text-center font-semibold text-purple-600">{r.interno || '-'}</td>
                          <td className="px-3 py-3 text-center font-semibold text-orange-600">{r.interno_retiro || '-'}</td>
                          <td className="px-3 py-3 text-xs text-gray-600">
                            <div>{r.chofer}</div>
                            <div className="text-gray-500">{new Date(r.fecha_entrega).toLocaleDateString('es-AR')}</div>
                          </td>
                          <td className="px-3 py-3 text-xs text-gray-600">
                            {r.fecha_retiro ? (
                              <>
                                <div>{r.chofer_retiro}</div>
                                <div className="text-gray-500">{new Date(r.fecha_retiro).toLocaleDateString('es-AR')}</div>
                              </>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-right font-semibold text-green-600">
                            {r.kilos ? `${r.kilos.toLocaleString('es-AR')} kg` : '-'}
                          </td>
                          <td className="px-3 py-3 text-center text-gray-700">
                            {r.dias !== null ? r.dias : '-'}
                          </td>
                          <td className="px-3 py-3 text-center">
                            {r.estado === 'COMPLETADO' ? (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                                COMPLETADO
                              </span>
                            ) : (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                                PENDIENTE
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-center">
                            <button
                              onClick={() => eliminarRegistro(r.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Eliminar"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>✓ Datos sincronizados en la nube con Supabase</p>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<SistemaContenedores />, document.getElementById('root'));
