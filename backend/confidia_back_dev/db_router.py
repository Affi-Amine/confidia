class SubscriptionsRouter:
    """
    A router to control all database operations on models in the
    'subscriptions' application.
    """
    
    def db_for_read(self, model, **hints):
        """
        Attempts to read models go to 'subscriptions' database.
        """
        if model._meta.app_label == 'subscriptions':
            return 'subscriptions'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write models go to 'subscriptions' database.
        """
        if model._meta.app_label == 'subscriptions':
            return 'subscriptions'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the 'subscriptions' app is involved.
        """
        if obj1._meta.app_label == 'subscriptions' or obj2._meta.app_label == 'subscriptions':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the 'subscriptions' app only appears in the 'subscriptions'
        database.
        """
        if app_label == 'subscriptions':
            return db == 'subscriptions'
        return None