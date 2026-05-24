import 'package:flutter/material.dart';
import 'package:formbricks_flutter/formbricks_flutter.dart';
import 'package:posthog_flutter/posthog_flutter.dart';
import 'apps/warehouse_app.dart';
import 'apps/delivery_app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // PostHog — Analytics, Session Recording, Feature Flags
  final posthogConfig = PostHogConfig(
    const String.fromEnvironment(
      'POSTHOG_KEY',
      defaultValue: 'phc_oxBkB8767YUgLD8qwab5mHetJDJMW6SKZ72BhcGyxgiQ',
    ),
  )
    ..host = 'https://us.i.posthog.com'
    ..captureApplicationLifecycleEvents = true
    ..debug = false;
  await Posthog().setup(posthogConfig);

  runApp(
    FormbricksProvider(
      client: FormbricksClient(
        appUrl: 'https://app.formbricks.com',
        environmentId: const String.fromEnvironment('FORMBRICKS_ENV_ID'),
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
