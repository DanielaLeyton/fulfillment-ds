import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

const _drivers = [
  _Driver('Francisco Aguayo',      'faguayo@gmail.com',      'DDHI88', 'Boosmap',  'En ruta'),
  _Driver('Ronald Vezga',          'ronaldvezga@gmail.com',  'ABCC09', 'Touch',    'En ruta'),
  _Driver('Héctor Biminchumo B.', 'hbbellido@gmail.com',    'JKCD17', 'Kowski',   'No disponible'),
  _Driver('Douglas Barraza',       'dbarraza@gmail.com',     'NHDY84', 'Boosmap',  'Disponible'),
  _Driver('Kevin Aceituno',        'kevinaceituno@gmail.com','JJ6583', 'Lo Llevo', 'En ruta'),
  _Driver('Nicolás Bofill',        'ni.bofill@gmail.com',    '—',      'Boosmap',  'No disponible'),
  _Driver('Frank San Martín',      'ffsanmartin@gmail.com',  'NGCD34', 'TCD',      'Disponible'),
];

class _Driver {
  const _Driver(this.name, this.email, this.plate, this.courier, this.status);
  final String name, email, plate, courier, status;
}

class ConductoresScreen extends StatefulWidget {
  const ConductoresScreen({super.key});

  @override
  State<ConductoresScreen> createState() => _ConductoresScreenState();
}

class _ConductoresScreenState extends State<ConductoresScreen> with SingleTickerProviderStateMixin {
  late final TabController _tabs = TabController(length: 3, vsync: this);
  final _search = TextEditingController();
  String _query = '';

  static const primary = Color(0xFF006DFF);
  static const secondary = Color(0xFF0F3893);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final filtered = _drivers.where((d) =>
        d.name.toLowerCase().contains(_query) ||
        d.plate.toLowerCase().contains(_query)).toList();

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FF),
      appBar: AppBar(
        backgroundColor: secondary,
        foregroundColor: Colors.white,
        title: const Text('Conductores'),
        actions: [
          IconButton(icon: const Icon(Icons.person_add_outlined), onPressed: () {}),
        ],
        bottom: TabBar(
          controller: _tabs,
          labelColor: Colors.white,
          unselectedLabelColor: Colors.white54,
          indicatorColor: primary,
          tabs: [
            const Tab(text: 'Todos (7)'),
            Tab(text: 'En ruta (${_drivers.where((d) => d.status == 'En ruta').length})'),
            Tab(text: 'Disponibles (${_drivers.where((d) => d.status == 'Disponible').length})'),
          ],
        ),
      ),
      body: Column(
        children: [
          // Search
          Container(
            color: Colors.white,
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
            child: TextField(
              controller: _search,
              onChanged: (v) => setState(() => _query = v.toLowerCase()),
              decoration: InputDecoration(
                hintText: 'Buscar por nombre o placa',
                prefixIcon: const Icon(Icons.search, size: 18),
                suffixIcon: _query.isNotEmpty
                    ? IconButton(icon: const Icon(Icons.close, size: 16), onPressed: () { _search.clear(); setState(() => _query = ''); })
                    : null,
                isDense: true,
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              ),
            ),
          ),
          const Divider(height: 1),

          // Tabs content
          Expanded(
            child: TabBarView(
              controller: _tabs,
              children: [
                _DriverList(drivers: filtered),
                _DriverList(drivers: filtered.where((d) => d.status == 'En ruta').toList()),
                _DriverList(drivers: filtered.where((d) => d.status == 'Disponible').toList()),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        backgroundColor: primary,
        icon: const Icon(Icons.add),
        label: const Text('Crear conductor'),
      ),
    );
  }

  @override
  void dispose() {
    _tabs.dispose();
    _search.dispose();
    super.dispose();
  }
}

class _DriverList extends StatelessWidget {
  const _DriverList({required this.drivers});
  final List<_Driver> drivers;

  @override
  Widget build(BuildContext context) {
    if (drivers.isEmpty) {
      return const Center(child: Text('Sin resultados', style: TextStyle(color: Color(0xFF63767A))));
    }
    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: drivers.length,
      separatorBuilder: (_, __) => const SizedBox(height: 10),
      itemBuilder: (_, i) => _DriverCard(driver: drivers[i]),
    );
  }
}

class _DriverCard extends StatelessWidget {
  const _DriverCard({required this.driver});
  final _Driver driver;

  static const primary = Color(0xFF006DFF);

  @override
  Widget build(BuildContext context) {
    final statusCfg = switch (driver.status) {
      'En ruta'       => (primary, const Color(0xFFE8F0FF)),
      'Disponible'    => (const Color(0xFF047E48), const Color(0xFFE8F6EE)),
      _               => (const Color(0xFFD72A22), const Color(0xFFFFF2F2)),
    };

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        children: [
          // Header row
          Padding(
            padding: const EdgeInsets.all(14),
            child: Row(children: [
              CircleAvatar(
                radius: 20,
                backgroundColor: primary.withOpacity(0.1),
                child: Text(
                  driver.name.substring(0, 1),
                  style: const TextStyle(color: primary, fontWeight: FontWeight.w700, fontSize: 16),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(driver.name, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: Color(0xFF0E2B69))),
                Text(driver.email, style: const TextStyle(fontSize: 12, color: Color(0xFF63767A))),
              ])),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: statusCfg.$2, borderRadius: BorderRadius.circular(9999)),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Container(width: 6, height: 6, decoration: BoxDecoration(color: statusCfg.$1, shape: BoxShape.circle)),
                  const SizedBox(width: 4),
                  Text(driver.status, style: TextStyle(color: statusCfg.$1, fontSize: 11, fontWeight: FontWeight.w600)),
                ]),
              ),
            ]),
          ),
          // Details row
          Container(
            decoration: const BoxDecoration(
              color: Color(0xFFF4F7FF),
              borderRadius: BorderRadius.vertical(bottom: Radius.circular(10)),
            ),
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            child: Row(children: [
              _Detail(Icons.credit_card_outlined, driver.plate),
              const SizedBox(width: 20),
              _Detail(Icons.delivery_dining_outlined, driver.courier),
              const Spacer(),
              IconButton(
                icon: const Icon(Icons.edit_outlined, size: 18),
                color: const Color(0xFF63767A),
                constraints: const BoxConstraints(),
                padding: EdgeInsets.zero,
                onPressed: () {},
              ),
              const SizedBox(width: 12),
              IconButton(
                icon: const Icon(Icons.description_outlined, size: 18),
                color: const Color(0xFF63767A),
                constraints: const BoxConstraints(),
                padding: EdgeInsets.zero,
                onPressed: () {},
              ),
            ]),
          ),
        ],
      ),
    );
  }
}

class _Detail extends StatelessWidget {
  const _Detail(this.icon, this.label);
  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Row(children: [
      Icon(icon, size: 13, color: const Color(0xFF63767A)),
      const SizedBox(width: 4),
      Text(label, style: const TextStyle(fontSize: 12, color: Color(0xFF37474F), fontWeight: FontWeight.w500)),
    ]);
  }
}
