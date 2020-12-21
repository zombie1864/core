import sqlite3 

class Schema: 
    def __init__(self):
        self.conn = sqlite3.connect('back_end.db')
        self.create_attr_table()

    def __del__(self):
        self.conn.commit()
        self.conn.close()

    def create_attr_table(self):
        query = """
        CREATE TABLE IF NOT EXISTS "Attributes" (
            id INTEGER PRIMARY KEY, 
            Name TEXT, 
            Age INTEGER, 
            Email TEXT, 
            Feedback TEXT,
            Gender INTEGER DEFAULT 0,
            _is_deleted INTEGER DEFAULT 0 
        );
        """

        self.conn.execute(query)


class AttrModel:
    TABLENAME = 'Attributes'

    def __init__(self):
        self.conn = sqlite3.connect('back_end.db')
        self.conn.row_factory = sqlite3.Row

    def __del__(self):
        self.conn.commit()
        self.conn.close()

    def get_by_id(self, _id):
        where_clause = f"AND id={_id}"
        return self.list_items(where_clause)

    def create(self, params):
        print(params)
        # TABLENAME = "ATTR"
        query = f'insert into {self.TABLENAME} ' \
                f'(Name, Age, Gender, Email,Feedback) ' \
                f'values ("{params.get("Name")}","{params.get("Age")}", "{params.get("Gender")}", "{params.get("Email")}", "{params.get("Feedback")}")'
        result = self.conn.execute(query)
        return self.get_by_id(result.lastrowid)

    def delete(self, item_id):
        # TABLENAME = "ATTR"
        query = f'UPDATE {self.TABLENAME} ' \
                f"SET _is_deleted =  {1} " \
                f"WHERE id = {item_id}"
        print (query)
        self.conn.execute(query)
        return self.list_items()


    def update(self, item_id, update_dict):
        # TABLENAME = "ATTR"
        set_query = ", ".join([f'{column} = {value}'
                     for column, value in update_dict.items()])
        query = f"UPDATE {self.TABLENAME} " \
                f"SET {set_query} " \
                f"WHERE id = {item_id}"
        self.conn.execute(query)
        return self.get_by_id(item_id)

    def list_items(self, where_clause=""):
        query = f"SELECT id, Name, Age, Gender, Email, Feedback " \
                f"from {self.TABLENAME} WHERE _is_deleted != {1} " + where_clause
        print (query)
        result_set = self.conn.execute(query).fetchall()
        result = [{column: row[i]
                  for i, column in enumerate(result_set[0].keys())}
                  for row in result_set]
        return result
