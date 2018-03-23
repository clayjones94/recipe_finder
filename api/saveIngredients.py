class USDRParser():

	def saveIngredientsToDB(self):
		from api.models import Ingredient
		foodObjs = self.readFoodDescription()
		for item in foodObjs:
			ing = Ingredient.objects.create(nut_db_id=item["nut_db_id"],
								food_grp_code=item["food_grp_code"],
								long_desc=item["long_desc"],
								short_desc=item["short_desc"],
								common_name=item["common_name"],
								manufac_name=item["manufac_name"],
								ref_desc=item["ref_desc"],
								refuse=item["refuse"],
								sci_name=item["sci_name"],
								pro_factor=item["pro_factor"],
								fat_factor=item["fat_factor"],
								cho_factor=item["cho_factor"] )
			ing.save()
			pass
		pass

	def readFoodDescription(self):
		des_headers = [
			"nut_db_id",
			"food_grp_code",
			"long_desc",
			"short_desc",
			"common_name",
			"manufac_name",
			"survey",
			"ref_desc",
			"refuse",
			"sci_name",
			"n_factor",
			"pro_factor",
			"fat_factor",
			"cho_factor"
		]
		foodObjs = self.readSRFile("api/FOOD_DES.txt", des_headers)
		return foodObjs

	def readSRFile(self, fname, hdrs):
		result = []
		with open(fname, "r") as ins:
		    for line in ins:
		        item = self.parseLine(line.strip(), hdrs)
		    	result.append(item)
		return result

	def parseLine(self, line, hdrs):
		values = line.split('^')
		foodItem = {}
		for i in range(0,len(values)):
			pVal = values[i]
			key = hdrs[i]
			m = pVal[1:-1]
			if m:
				pVal = m
			if not pVal:
				pVal = None
			print(m)
			foodItem[key] = pVal
		return foodItem

USDRParser().saveIngredientsToDB();