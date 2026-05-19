import 'package:flutter/material.dart';
import 'package:formbricks_flutter/formbricks_flutter.dart';
import 'apps/warehouse_app.dart';
import 'apps/delivery_app.dart';

void main() {
  runApp(
    FormbricksProvider(
      client: FormbricksClient(
        appUrl: 'https://app.formbricks.com',
        environmentId: 'cmpcvgl065sd6wo01fka92ucr', // reemplazar con el ID de tu proyecto en app.formbricks.com
      ),
      child: const FdsDemoLauncher(),
    ),
  );
}

class FdsDemoLauncher extends StatefulWidget {
  const FdsDemoLauncher({super.key});

  @override
  State<FdsDemoLauncher> createState() => _FdsDemoLauncherState();
}

class _FdsDemoLauncherState extends State<FdsDemoLauncher> {
  _Brand _selected = _Brand.warehouseOps;

  @override
  Widget build(BuildContext context) {
    return switch (_selected) {
      _Brand.warehouseOps => WarehouseApp(onSwitchBrand: _switch),
      _Brand.lastMile     => DeliveryApp(onSwitchBrand: _switch),
    };
  }

  void _switch() => setState(() {
        _selected = _selected == _Brand.warehouseOps ? _Brand.lastMile : _Brand.warehouseOps;
      });
}

enum _Brand { warehouseOps, lastMile }
