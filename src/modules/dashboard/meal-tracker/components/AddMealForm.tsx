'use client';

import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().min(2, 'Min 2 chars').required('Meal name required'),
  mealType: Yup.string().oneOf(['breakfast', 'lunch', 'dinner', 'snack', 'custom']).required('Type required'),
  calories: Yup.number().min(0, 'Must be positive').required('Required'),
  protein: Yup.number().min(0).required('Required'),
  carbs: Yup.number().min(0).required('Required'),
  fat: Yup.number().min(0).required('Required'),
});

interface AddMealFormProps {
  onAddMeal: (values: any) => Promise<boolean>;
}

export function AddMealForm({ onAddMeal }: AddMealFormProps) {
  const formik = useFormik({
    initialValues: { name: '', mealType: 'breakfast', calories: '', protein: '', carbs: '', fat: '' },
    validationSchema: schema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const success = await onAddMeal(values);
      if (success) {
        resetForm();
      }
      setSubmitting(false);
    },
  });

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="rounded-2xl p-5" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
      <h4 className="text-sm font-bold text-white mb-4">Add New Meal</h4>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
                <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">Meal Name</label>
                <input type="text" placeholder="Chicken Rice Bowl" {...formik.getFieldProps('name')}
                    className="w-full px-4 py-2.5 rounded-xl text-white text-sm outline-none bg-white/5 border border-white/10" />
                {formik.touched.name && formik.errors.name && <p className="text-xs text-red-400 mt-1">{formik.errors.name}</p>}
            </div>
            <div>
                <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">Meal Type</label>
                <select {...formik.getFieldProps('mealType')}
                    className="w-full px-4 py-2.5 rounded-xl text-white text-sm outline-none bg-[#0a0a1a] border border-white/10">
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
            {[
              { name: 'calories', label: 'Calories (kcal)', placeholder: '500' },
              { name: 'protein', label: 'Protein (g)', placeholder: '40' },
              { name: 'carbs', label: 'Carbs (g)', placeholder: '60' },
              { name: 'fat', label: 'Fat (g)', placeholder: '12' },
            ].map(field => (
              <div key={field.name}>
                <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">{field.label}</label>
                <input type="number" placeholder={field.placeholder}
                  {...formik.getFieldProps(field.name)}
                  className="w-full px-4 py-2.5 rounded-xl text-white text-sm outline-none bg-white/5 border border-white/10" />
                {formik.touched[field.name as keyof typeof formik.values] && formik.errors[field.name as keyof typeof formik.errors] &&
                  <p className="text-xs text-red-400 mt-1">{formik.errors[field.name as keyof typeof formik.errors] as string}</p>}
              </div>
            ))}
        </div>
        <button type="submit" disabled={formik.isSubmitting}
          className="bg-[#00d4ff] text-black px-6 py-2.5 rounded-xl text-sm font-bold disabled:opacity-50 hover:scale-105 transition-transform">
          {formik.isSubmitting ? 'Adding...' : 'Add Meal →'}
        </button>
      </form>
    </motion.div>
  );
}
